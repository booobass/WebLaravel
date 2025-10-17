import Register from "@/app/(auth)/register/page"
import { api } from "@/lib/axios"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"

jest.mock("@/lib/axios")
const mockedApi = api as jest.Mocked<typeof api>

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}))

describe("Register Page", () => {
    const mockPush = jest.fn()
    const mockAlert = jest.fn()

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({push: mockPush})
        jest.spyOn(window, "alert").mockImplementation(mockAlert)
        jest.clearAllMocks()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("フォーム入力後、登録成功したら遷移する", async () => {
        mockedApi.post.mockResolvedValue({data: {}} as AxiosResponse)

        render(<Register />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/ユーザー名/i), "Taro")
        await user.type(screen.getByLabelText(/メールアドレス/i), "taro@example.com")
        await user.type(screen.getByLabelText(/^パスワード（８文字以上）$/i), "password123")
        await user.type(screen.getByLabelText(/^パスワード確認$/i), "password123")
        await user.type(screen.getByLabelText(/URL/i), "taro_homepage")

        await user.click(screen.getByRole("button", {name: /登録/i}))

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith("/api/register", expect.objectContaining({
                name: "Taro",
                email: "taro@example.com",
                password: "password123",
                password_confirmation: "password123",
                slug: "taro_homepage"
            }))
            expect(mockAlert).toHaveBeenCalledWith("ユーザー登録しました")
            expect(mockPush).toHaveBeenCalledWith("/login")
        })
    })

    test("登録失敗でアラートが出る", async () => {
        mockedApi.post.mockRejectedValueOnce(new Error("error"))

        render(<Register />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/ユーザー名/i), "Hana")
        await user.type(screen.getByLabelText(/メールアドレス/i), "hana@example.com")
        await user.type(screen.getByLabelText(/^パスワード（８文字以上）$/i), "password123")
        await user.type(screen.getByLabelText(/^パスワード確認$/i), "password123")
        await user.type(screen.getByLabelText(/URL/i), "hana_homepage")

        await user.click(screen.getByRole("button", {name: /登録/i}))

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledTimes(1)
            expect(mockAlert).toHaveBeenCalledWith("ユーザー登録できません")
            expect(mockPush).not.toHaveBeenCalled()
        })
    })
})