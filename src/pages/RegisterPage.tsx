import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function RegisterPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleShowConfirm = () => {
    // Basic validation
    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields",
      })
      return
    }
    setShowConfirmDialog(true)
  }

  const handleRegister = async () => {
    setShowConfirmDialog(false)
    setIsLoading(true)

    try {
      const res = await axios.post("/register", {
        name,
        email,
        password,
      })

      toast({
        title: "Success",
        description: "Register Success",
      })
      setTimeout(() => navigate("/"), 1500)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Unknown error occurred"
      toast({
        variant: "destructive",
        title: "Register Failed",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4" style={{ backgroundColor: '#000000' }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-black/80 backdrop-blur-sm border border-neon-blue/50 rounded-2xl overflow-hidden animate-border-glow">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Background Image */}
            <div className="md:w-1/2 relative bg-cover bg-center min-h-[300px] md:min-h-[500px]" style={{ backgroundImage: "url('/background.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                <h2 className="text-4xl font-bold text-neon-blue">
                  Join Us
                </h2>
                <p className="text-gray-300 text-lg mt-4">
                  Create your account and start your journey
                </p>
              </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Register</h1>
                <p className="text-gray-400">Fill in your details to create an account</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neon-blue">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-neon-blue focus:ring-neon-blue/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neon-blue">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-neon-blue focus:ring-neon-blue/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neon-blue">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-neon-blue focus:ring-neon-blue/50"
                  />
                </div>

                <Button
                  onClick={handleShowConfirm}
                  disabled={isLoading}
                  className="w-full bg-neon-blue text-black font-bold hover:bg-neon-blue/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Registering..." : "Sign Up"}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-gray-400">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/")}
                      className="text-neon-blue font-semibold hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              Are you sure the data is correct?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p className="text-sm text-white"><span className="text-neon-blue font-semibold">Name:</span> {name}</p>
            <p className="text-sm text-white"><span className="text-neon-blue font-semibold">Email:</span> {email}</p>
            <p className="text-sm text-white"><span className="text-neon-blue font-semibold">Password:</span> {'•'.repeat(password.length)}</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="border-gray-600 text-black hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRegister}
              className="bg-neon-blue text-black font-bold hover:bg-neon-blue/80"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
