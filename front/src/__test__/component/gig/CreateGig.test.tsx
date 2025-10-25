import CreateGig from "@/components/gig/create/page"
import { api } from "@/lib/axios"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useRouter } from "next/navigation"

jest.mock("@/lib/axios", () => ({
    api: {post: jest.fn()}
}))

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}))

describe("CreateGig Component", () => {
    const mockPush = jest.fn()
    const mockAlert = jest.fn()

    beforeEach(() => {
        ;(api.post as jest.Mock).mockResolvedValue({data: {}})
        ;(useRouter as jest.Mock).mockReturnValue({push: mockPush})
        jest.spyOn(window, "alert").mockImplementation(mockAlert)
        localStorage.setItem("token", "fake-token")
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("フォーム入力と送信でAPIが呼ばれる", async () => {
        render(<CreateGig />)

        fireEvent.change(screen.getByLabelText("日付"), {target: {value: "2025-10-25"}})
        fireEvent.change(screen.getByLabelText("場所"), {target: {value: "Tokyo"}})
        fireEvent.change(screen.getByLabelText("オープン"), {target: {value: "18:00"}})
        fireEvent.change(screen.getByLabelText("スタート"), {target: {value: "18:30"}})
        fireEvent.change(screen.getByLabelText("前売りチケット"), {target: {value: "3000"}})
        fireEvent.change(screen.getByLabelText("当日チケット"), {target: {value: "3500"}})
        fireEvent.change(screen.getByLabelText("バンド"), {target: {value: "T-Band"}})
        fireEvent.change(screen.getByLabelText("DJ"), {target: {value: "T-Dj"}})

        fireEvent.click(screen.getByText("登録"))

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith(
                "/api/gig/store",
                expect.objectContaining({
                date: "2025-10-25",
                place: "Tokyo",
                open_time: "18:00",
                start_time: "18:30",
                adv_price: "3000",
                day_price: "3500",
                bands: [{ name: "T-Band" }],
                djs: [{ name: "T-Dj" }],
                }),
                expect.any(Object)
            );
            expect(mockAlert).toHaveBeenCalledWith("データを登録しました");
            expect(mockPush).toHaveBeenCalledWith("/customer");
        });
    })

    test("APIエラー時はアラートが出る", async () => {
        render(<CreateGig />)

        fireEvent.change(screen.getByLabelText("日付"), {target: {value: "2025-10-25"}})
        fireEvent.change(screen.getByLabelText("場所"), {target: {value: "Tokyo"}})
        fireEvent.change(screen.getByLabelText("オープン"), {target: {value: "18:00"}})
        fireEvent.change(screen.getByLabelText("スタート"), {target: {value: "18:30"}})
        fireEvent.change(screen.getByLabelText("前売りチケット"), {target: {value: "3000"}})
        fireEvent.change(screen.getByLabelText("当日チケット"), {target: {value: "3500"}})
        fireEvent.change(screen.getByLabelText("バンド"), {target: {value: "T-Band"}})
        fireEvent.change(screen.getByLabelText("DJ"), {target: {value: "T-Dj"}})

        ;(api.post as jest.Mock).mockRejectedValueOnce(new Error("error"));

        fireEvent.click(screen.getByText("登録"))

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith("データを登録出来ません")
        })
    })

    test("バンド、DJの追加ボタンを押すと行が増える", () => {
        render(<CreateGig />)

        expect(screen.getAllByLabelText("バンド").length).toBe(1)
        expect(screen.getAllByLabelText("DJ").length).toBe(1)

        fireEvent.click(screen.getByText("バンドを追加"))
        fireEvent.click(screen.getByText("DJを追加"))

        expect(screen.getAllByLabelText("バンド").length).toBe(2)
        expect(screen.getAllByLabelText("DJ").length).toBe(2)
    })

    test("空文字のバンド、DJは送信データから除外される", async () => {
        render(<CreateGig />)

        fireEvent.click(screen.getByText("バンドを追加"))
        fireEvent.change(screen.getAllByLabelText("バンド")[0], { target: { value: "Band-A" } })
        fireEvent.change(screen.getAllByLabelText("DJ")[0], { target: { value: "" } })

        fireEvent.change(screen.getByLabelText("日付"), { target: { value: "2025-10-25" } })
        fireEvent.change(screen.getByLabelText("場所"), { target: { value: "Tokyo" } })
        fireEvent.change(screen.getByLabelText("オープン"), { target: { value: "18:00" } })
        fireEvent.change(screen.getByLabelText("スタート"), { target: { value: "18:30" } })
        fireEvent.change(screen.getByLabelText("前売りチケット"), { target: { value: "3000" } })
        fireEvent.change(screen.getByLabelText("当日チケット"), { target: { value: "3500" } })

        fireEvent.click(screen.getByText("登録"))

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith(
                "/api/gig/store",
                expect.objectContaining({
                bands: [{ name: "Band-A" }], 
                djs: [], 
                }),
                expect.any(Object)
            )
        })
    })
})