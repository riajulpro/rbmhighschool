/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import axiosInstance from "@/lib/axios";

type Step =
  | "email_input"
  | "otp_input"
  | "password_input"
  | "success"
  | "error";

export default function PasswordResetPage() {
  const [step, setStep] = React.useState<Step>("email_input");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/auth/forgot-password", {
        email,
      });

      if (response.status === 200) {
        setMessage(
          response.data.message ||
            "OTP sent successfully! Please check your email."
        );
        setStep("otp_input");
      } else {
        setErrorMessage(
          response.data.message || "Failed to send OTP. Please try again."
        );
        setStep("error");
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      setErrorMessage(
        error.response.data.message ||
          "An unexpected error occurred. Please try again."
      );
      setStep("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpComplete = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setStep("password_input");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setMessage("");

    try {
      const response = await axiosInstance.post("/api/auth/verify-otp", {
        email,
        otp,
        newPassword,
      });

      if (response.status === 200) {
        setMessage(
          response.data.message || "Your password has been reset successfully!"
        );
        setStep("success");
      } else {
        setErrorMessage(
          response.data.message ||
            "Failed to reset password. Please check your OTP and try again."
        );
        setStep("error");
      }
    } catch (error: any) {
      console.error("Error resetting password:", error);
      setErrorMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
      setStep("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep("email_input");
    setEmail("");
    setOtp("");
    setNewPassword("");
    setErrorMessage("");
    setMessage("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Password Reset</CardTitle>
          <CardDescription>
            {step === "email_input" &&
              "Enter your email to receive a one-time password."}
            {step === "otp_input" && `Enter the 6-digit OTP sent to ${email}.`}
            {step === "password_input" && `Set your new password for ${email}.`}
            {step === "success" &&
              "Your password has been successfully updated."}
            {step === "error" && "There was an issue with your request."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          {message && step !== "error" && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {step === "email_input" && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          )}

          {step === "otp_input" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={otp}
                  onChange={handleOtpComplete}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                onClick={handleSendOtp}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Resending..." : "Resend OTP"}
              </Button>
            </div>
          )}

          {step === "password_input" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </form>
          )}

          {(step === "success" || step === "error") && (
            <div className="space-y-4">
              <Button onClick={handleStartOver} className="w-full">
                Start Over
              </Button>
              {step === "success" && (
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="w-full"
                >
                  Go to Login
                </Button>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {step !== "success" && step !== "error" && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Contact support.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
