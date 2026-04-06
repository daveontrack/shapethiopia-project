import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
<<<<<<< HEAD
  const supabaseResponse = NextResponse.next({
=======
  let supabaseResponse = NextResponse.next({
>>>>>>> 15d4869a3d1f5707ade98ec9a559f125767e76d3
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

<<<<<<< HEAD
  // For testing: temporarily force protection even without env vars
  // Remove this block once Supabase is properly configured
  const isTesting = true
  if (isTesting) {
    // Define protected routes that require authentication
    const protectedPaths = ['/dashboard', '/donate']

    // Check if the current request path is protected
    const isProtectedRoute = protectedPaths.some(path =>
      request.nextUrl.pathname.startsWith(path)
    )

    // For testing: check if user is authenticated, redirect only if not
    if (isProtectedRoute) {
      // If Supabase is configured, check authentication
      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createServerClient(
          supabaseUrl,
          supabaseAnonKey,
          {
            cookies: {
              getAll() {
                return request.cookies.getAll()
              },
              setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                  request.cookies.set(name, value),
                )
                const response = NextResponse.next({
                  request,
                })
                cookiesToSet.forEach(({ name, value, options }) =>
                  response.cookies.set(name, value, options),
                )
              },
            },
          },
        )

        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          const url = request.nextUrl.clone()
          url.pathname = '/auth/login'
          url.searchParams.set('redirectTo', request.nextUrl.pathname)
          return NextResponse.redirect(url)
        }
      } else {
        // If Supabase not configured, check for any auth-related cookies (for testing)
        const cookies = request.cookies.getAll()
        const hasAuthCookie = cookies.some(cookie =>
          cookie.name.includes('auth') ||
          cookie.name.includes('session') ||
          cookie.name.includes('token') ||
          cookie.name.startsWith('sb-')
        )

        if (!hasAuthCookie) {
          const url = request.nextUrl.clone()
          url.pathname = '/auth/login'
          url.searchParams.set('redirectTo', request.nextUrl.pathname)
          return NextResponse.redirect(url)
        }
      }
    }
  }

=======
>>>>>>> 15d4869a3d1f5707ade98ec9a559f125767e76d3
  // If environment variables are not set, skip authentication
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
<<<<<<< HEAD
          const response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
=======
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
>>>>>>> 15d4869a3d1f5707ade98ec9a559f125767e76d3
          )
        },
      },
    },
  )

<<<<<<< HEAD
  // Get the current user session
=======
>>>>>>> 15d4869a3d1f5707ade98ec9a559f125767e76d3
  const {
    data: { user },
  } = await supabase.auth.getUser()

<<<<<<< HEAD
  // Define protected routes that require authentication
  const protectedPaths = ['/dashboard', '/donate']

  // Check if the current request path is protected
  const isProtectedRoute = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // If accessing a protected route without authentication, redirect to login
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    // Preserve the original destination for post-login redirect
=======
  // Protect dashboard, admin, and donate routes
  const protectedPaths = ['/dashboard', '/donate']
  const isProtectedRoute = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )
  
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    // Add redirect parameter to return to the original page after login
>>>>>>> 15d4869a3d1f5707ade98ec9a559f125767e76d3
    url.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
