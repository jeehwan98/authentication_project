import "@test"
import { enableFetchMocks } from "jest-fetch-mock";
import { loginAPI } from "./auth";
import { LoginDetailsProps } from "@/interfaces/auth";

enableFetchMocks();

describe("loginAPI", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  // test 1: successful login with String "Login Successful"
  it("should return data on successful login", async () => {
    const mockData = "Login successful";
    fetchMock.mockResponseOnce(JSON.stringify(mockData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    const loginDetails: LoginDetailsProps = {
      email: "test@example.com",
      password: "123123123"
    };

    const result = await loginAPI(loginDetails);
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      })
    );
  });
})