import UpdateAlbum from "@/app/(dashboard)/update/album/[id]/page"
import { api } from "@/lib/axios"
import { ReadAlbum } from "@/lib/ReadAlbum"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useParams, useRouter } from "next/navigation"

jest.mock("@/lib/axios")
jest.mock("@/lib/ReadAlbum")
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
    useParams: jest.fn()
}))

describe("UpdateAlbum", () => {
    const mockPush = jest.fn()

    beforeEach(() => {
        ;(useRouter as jest.Mock).mockReturnValue({push: mockPush})
        ;(useParams as jest.Mock).mockReturnValue({id: "1"})
        jest.clearAllMocks()
    })

    beforeAll(() => {
        process.env.NEXT_PUBLIC_STORAGE_URL = "http://localhost:3000"
    })

    test("既存データがフォームに正しく反映される", async () => {
        ;(ReadAlbum as jest.Mock).mockReturnValue({
            albums: [
                {
                    id: 1,
                    title: "Test Album",
                    image: "http://album.jpg",
                    songs: [
                        {title: "Song A", track_number: 1},
                        {title: "Song B", track_number: 2}
                    ]
                }
            ]
        })

        render(<UpdateAlbum />)

        expect(await screen.findByDisplayValue("Test Album")).toBeInTheDocument()
        expect(await screen.findByAltText("http://album.jpg")).toBeInTheDocument()

        const inputs = screen.getAllByRole("textbox")
        expect(inputs.length).toBe(3)
    })

    test("画像をドロップして新しい画像をセットできる", async () => {
        const file = new File(["dummy"], "newImage.png", { type: "image/png" })
        ;(ReadAlbum as jest.Mock).mockReturnValue({ albums: [] })

        render(<UpdateAlbum />)

        const input = screen.getByLabelText("画像を変更する場合ここにドロップして下さい", {
        exact: false,
        }) as HTMLInputElement

        fireEvent.change(input, { target: { files: [file] } })

        // 内部状態が変わったことを確認
        expect(input.files?.[0].name).toBe("newImage.png")
    })

    test("フォーム送信でAPIが呼ばれ、成功時に/customer#albumへ遷移する", async () => {
        ;(ReadAlbum as jest.Mock).mockReturnValue({
        albums: [
            {
            id: 1,
            title: "Old Title",
            image: "http://old.png",
            songs: [{ title: "Old Song", track_number: 1 }],
            },
        ],
        })

        ;(api.post as jest.Mock).mockResolvedValue({ data: { success: true } })

        render(<UpdateAlbum />)

        const titleInput = await screen.findByDisplayValue("Old Title")
        await userEvent.clear(titleInput)
        await userEvent.type(titleInput, "Updated Title")

        const button = screen.getByRole("button", { name: "更新" })
        await userEvent.click(button)

        await waitFor(() => {
        expect(api.post).toHaveBeenCalledTimes(1)
        })

        // API呼び出し内容を確認
        const [url, formData] = (api.post as jest.Mock).mock.calls[0]
        expect(url).toBe("/api/album/1")
        expect(formData.get("title")).toBe("Updated Title")

        // ページ遷移確認
        await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/customer#album")
        })
    })
})