import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function AuthDialog({ isOpen, onOpenChange }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Close the dialog if user is logged in
    if (user && isOpen) {
      onOpenChange(false);
    }
  }, [user, isOpen, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
            <DialogDescription>
              {isLogin
                ? "Please enter your credentials to login."
                : "Please fill in the details to create an account."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>

          <DialogFooter>
            {isLogin ? (
              <p className="text-sm">
                New to our platform?{" "}
                <Button variant="link" onClick={() => setIsLogin(false)}>
                  Create an account
                </Button>
              </p>
            ) : (
              <p className="text-sm ">
                Already have an account?{" "}
                <Button variant="link" onClick={() => setIsLogin(true)}>
                  Login
                </Button>
              </p>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AuthDialog;
