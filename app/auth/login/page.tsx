<<<<<<< HEAD
"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/"

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClient()
      const callbackUrl = window.location.origin + "/auth/callback?redirectTo=" + encodeURIComponent(redirectTo)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
        },
      })

      if (error) {
        throw error
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start Google sign in")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md rounded-3xl border border-border bg-background/95 shadow-2xl shadow-slate-900/10">
        <CardHeader className="text-center px-10 pt-10">
          <CardTitle className="font-serif text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Sign in to your account to continue making an impact
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-10 pb-6">
          <Button
            type="button"
            className="w-full justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in with Google...
              </>
            ) : (
              <>
                <Chrome className="h-4 w-4" />
                Continue with Google
              </>
            )}
          </Button>

          {error ? <p className="text-sm text-center text-destructive">{error}</p> : null}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-10 pb-10">
=======
// "use client"

// import { Suspense } from "react"
// import Link from "next/link"
// import { useSearchParams } from "next/navigation"
// import { Heart } from "lucide-react"
// import { AuthForm } from "@/components/auth-form"

// function LoginContent() {
//   const searchParams = useSearchParams()
//   const redirectTo = searchParams.get('redirectTo') || '/dashboard'

//   return (
//     <div className="min-h-screen bg-secondary/30 flex flex-col">
//       {/* Header */}
//       <header className="p-4">
//         <Link href="/" className="flex items-center gap-2 w-fit">
//           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//             <Heart className="w-5 h-5 text-primary-foreground" />
//           </div>
//           <span className="font-serif text-xl font-bold text-foreground">
//             SHAPE<span className="text-primary">ethiopia</span>
//           </span>
//         </Link>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex items-center justify-center px-4 py-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Title */}
//           <div className="text-center space-y-2">
//             <h1 className="font-serif text-3xl font-bold text-foreground">
//               Welcome Back
//             </h1>
//             <p className="text-muted-foreground">
//               Sign in to your account to continue making an impact
//             </p>
//           </div>

//           {/* Auth Form */}
//           <AuthForm mode="login" redirectTo={redirectTo} />

//           {/* Footer */}
//           <div className="text-center">
//             <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
//         <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
//       </div>
//     }>
//       <LoginContent />
//     </Suspense>
//   )
// }
//       <header className="p-4">
//         <Link href="/" className="flex items-center gap-2 w-fit">
//           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//             <Heart className="w-5 h-5 text-primary-foreground" />
//           </div>
//           <span className="font-serif text-xl font-bold text-foreground">
//             SHAPE<span className="text-primary">ethiopia</span>
//           </span>
//         </Link>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex items-center justify-center px-4 py-12">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <CardTitle className="font-serif text-2xl">Welcome Back</CardTitle>
//             <CardDescription>
//               Sign in to your account to continue making an impact
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             {/* Social Login Buttons */}
//             <div className="space-y-3">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => handleOAuthLogin('google')}
//                 disabled={isLoading}
//               >
//                 <Chrome className="mr-2 h-4 w-4" />
//                 Continue with Google
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => handleOAuthLogin('facebook')}
//                 disabled={isLoading}
//               >
//                 <Facebook className="mr-2 h-4 w-4" />
//                 Continue with Facebook
//               </Button>
              
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t" />
//                 </div>
//                 <div className="relative flex justify-center text-xs uppercase">
//                   <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 pr-10"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Signing in...
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//           <CardFooter className="flex flex-col gap-4">
//             <p className="text-sm text-muted-foreground text-center">
//               Don't have an account?{" "}
//               <Link 
//                 href={`/auth/sign-up${redirectTo !== '/dashboard' ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`} 
//                 className="text-primary hover:underline font-medium"
//               >
//                 Sign up
//               </Link>
//             </p>
//             <Link href="/" className="text-sm text-muted-foreground hover:text-foreground text-center">
//               Back to Home
//             </Link>
//           </CardFooter>
//         </Card>
//       </main>
//     </div>
//   )
// }
"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Heart } from "lucide-react"
import { AuthForm } from "@/components/auth-form"

function LoginContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground">
            SHAPE<span className="text-primary">ethiopia</span>
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue making an impact
            </p>
          </div>

          {/* Auth Form */}
          <AuthForm mode="login" redirectTo={redirectTo} />

          {/* Footer */}
>>>>>>> 15d4869a3d1f5707ade98ec9a559f125767e76d3
          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Home
            </Link>
          </div>
<<<<<<< HEAD
        </CardFooter>
      </Card>
    </div>
  )
=======
        </div>
      </main>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
>>>>>>> 15d4869a3d1f5707ade98ec9a559f125767e76d3
}