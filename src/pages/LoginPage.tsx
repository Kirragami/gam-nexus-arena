
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gamepad2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LOGIN_USER } from "@/graphql/auth";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [loginMutation, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const { accessToken, user } = data.login;
      login(accessToken, user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName || user.username}!`
      });
      navigate("/browse");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation({
      variables: {
        input: {
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password
        }
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Gaming Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
            <Gamepad2 className="h-10 w-10" />
            <span className="text-3xl font-bold">Gam</span>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-800/80 backdrop-blur-xl border-purple-500/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <p className="text-gray-400">Sign in to continue your gaming journey</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail" className="text-gray-300">Username or Email</Label>
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  placeholder="Enter username or email"
                  value={formData.usernameOrEmail}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                Forgot your password?
              </Link>
              
              <div className="border-t border-slate-700 pt-4">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
