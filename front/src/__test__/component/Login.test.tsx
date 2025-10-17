import Login from "@/app/(auth)/login/page"
import { AuthProvider } from "@/context/AuthContext"
import { api } from "@/lib/axios"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"

const renderWithAuth = (ui: React.ReactNode) => {
    return render(<AuthProvider>{ui}</AuthProvider>)
}

jest.mock("@/lib/axios")
const mockedApi = api as jest.Mocked<typeof api>

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}))

describe("Login Page", () => {
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

    test("ログイン成功後、createページに遷移する", async () => {
        mockedApi.post.mockResolvedValue({
            data: {
                token: "dummy-token",
                user: {
                    slug: "dummy-slug"
                }
            }} as AxiosResponse)

        renderWithAuth(<Login />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/メールアドレス/i), "taro@example.com")
        await user.type(screen.getByLabelText(/^パスワード$/i), "password123")
        await user.type(screen.getByLabelText(/^パスワード確認$/i), "password123")

        await user.click(screen.getByRole("button", {name: /ログイン/i}))

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith("/api/login", expect.objectContaining({
                email: "taro@example.com",
                password: "password123",
                password_confirmation: "password123",
            }))
            expect(mockAlert).toHaveBeenCalledWith("ログインしました")
            expect(mockPush).toHaveBeenCalledWith("/create")
        })
    })

    test("ログイン失敗でアラートが出る", async () => {
        mockedApi.post.mockRejectedValueOnce(new Error("error"))

        renderWithAuth(<Login />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/メールアドレス/i), "taro@example.com")
        await user.type(screen.getByLabelText(/^パスワード$/i), "password123")
        await user.type(screen.getByLabelText(/^パスワード確認$/i), "password123")

        await user.click(screen.getByRole("button", {name: /ログイン/i}))

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledTimes(1)
            expect(mockAlert).toHaveBeenCalledWith("ログインできません")
            expect(mockPush).not.toHaveBeenCalled()

        })
    })
})