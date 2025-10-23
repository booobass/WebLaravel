import CreateAlbum from "@/components/album/create/page";
import { api } from "@/lib/axios";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("@/lib/axios", () => ({
    api: {post: jest.fn()}
}))

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}))

describe("CreateAlbum Component", () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        ;(api.post as jest.Mock).mockResolvedValue({date: {}})
        ;(useRouter as jest.Mock).mockReturnValue({push: mockPush})
        jest.spyOn(window, "alert").mockImplementation(() => {})
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("フォーム入力と送信でAPIが呼ばれる", async () => {
        render(<CreateAlbum />)

        fireEvent.change(screen.getByLabelText("アルバム名"), {target: {value: "My Album"}})
        fireEvent.change(screen.getByLabelText("曲順"), {target: {value: "1"}})
        fireEvent.change(screen.getByLabelText("曲名"), {target: {value: "My Song"}})

        const file = new File(["dummy-image"], "album.jpg", {type: "image/jpeg"})

        const fileInput = screen.getByTestId("file-input")

        fireEvent.change(fileInput, {target: {file: [file]}})

        fireEvent.click(screen.getByText("登録"))

        await waitFor(() => expect(api.post).toHaveBeenCalledTimes(1))

        expect(mockPush).toHaveBeenCalledWith("/customer")
        expect(window.alert).toHaveBeenCalledWith("アルバムを登録しました")

    })

    it("API失敗時にアラートが出る", async () => {
        ;(api.post as jest.Mock).mockRejectedValueOnce(new Error("fail"))

        render(<CreateAlbum />)

        fireEvent.change(screen.getByLabelText("アルバム名"), {target: {value: "Test Album"}})
        fireEvent.click(screen.getByText("登録"))

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("アルバムを登録出来ません")
        })
    })

})