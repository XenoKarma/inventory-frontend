import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast"

export default function LoginPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    // Prevent double submit
    if (isLoading) return

    // Basic validation
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields",
      })
      return
    }

    setIsLoading(true)

    try {
      const res = await axios.post("/login", {
        email,
        password,
      })

      const token = res.data.data.token
      localStorage.setItem("token", token)
      toast({
        title: "Success",
        description: "Login successfully",
      })
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Unknown error occurred"
      toast({
        variant: "destructive",
        title: "Login Failed",
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
                  Welcome Back
                </h2>
                <p className="text-gray-300 text-lg mt-4">
                  Sign in to continue your journey
                </p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
                <p className="text-gray-400">Enter your credentials to access your account</p>
              </div>

              <div className="space-y-6">
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
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-neon-blue text-black font-bold hover:bg-neon-blue/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-gray-400">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/register")}
                      className="text-neon-blue font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
