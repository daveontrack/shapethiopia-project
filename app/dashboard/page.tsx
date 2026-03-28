// import { createClient } from "@/lib/supabase/server"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { DollarSign, HandHeart, Clock, TrendingUp } from "lucide-react"
// import Link from "next/link"

// export default async function DashboardPage() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()

//   // Get user's donations
//   const { data: donations } = await supabase
//     .from("donations")
//     .select("*")
//     .eq("user_id", user?.id)
//     .order("created_at", { ascending: false })

//   // Get user's volunteer applications
//   const { data: volunteerApps } = await supabase
//     .from("volunteer_applications")
//     .select("*")
//     .eq("user_id", user?.id)
//     .order("created_at", { ascending: false })

//   const totalDonations = donations?.reduce((sum, d) => sum + (d.payment_status === "completed" ? Number(d.amount) : 0), 0) || 0
//   const pendingDonations = donations?.filter(d => d.payment_status === "pending").length || 0
//   const activeVolunteerApps = volunteerApps?.filter(v => v.status === "active" || v.status === "approved").length || 0
//   const pendingVolunteerApps = volunteerApps?.filter(v => v.status === "pending").length || 0

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("first_name")
//     .eq("id", user?.id)
//     .single()

//   const greeting = profile?.first_name ? `Welcome back, ${profile.first_name}!` : "Welcome to your Dashboard!"

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="font-serif text-3xl font-bold text-foreground">{greeting}</h1>
//         <p className="text-muted-foreground mt-2">
//           Track your contributions and engagement with SHAPEthiopia
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${totalDonations.toFixed(2)}</div>
//             <p className="text-xs text-muted-foreground">
//               Lifetime contributions
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Donations</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingDonations}</div>
//             <p className="text-xs text-muted-foreground">
//               Awaiting processing
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Volunteer Status</CardTitle>
//             <HandHeart className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{activeVolunteerApps}</div>
//             <p className="text-xs text-muted-foreground">
//               Active programs
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingVolunteerApps}</div>
//             <p className="text-xs text-muted-foreground">
//               Under review
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Make a Donation</CardTitle>
//             <CardDescription>
//               Support our programs and help transform lives in Ethiopia
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button asChild>
//               <Link href="/donate">Donate Now</Link>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Become a Volunteer</CardTitle>
//             <CardDescription>
//               Join our team and make a direct impact in communities
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button asChild variant="outline">
//               <Link href="/volunteer">Apply to Volunteer</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//           <CardDescription>Your latest donations and volunteer activity</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {(donations?.length || 0) + (volunteerApps?.length || 0) === 0 ? (
//             <p className="text-muted-foreground text-center py-8">
//               No activity yet. Start by making a donation or applying to volunteer!
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {donations?.slice(0, 3).map((donation) => (
//                 <div key={donation.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                       <DollarSign className="w-5 h-5 text-primary" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Donation - ${donation.amount}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {new Date(donation.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     donation.payment_status === "completed" 
//                       ? "bg-success/10 text-success" 
//                       : "bg-accent/10 text-accent-foreground"
//                   }`}>
//                     {donation.payment_status}
//                   </span>
//                 </div>
//               ))}
//               {volunteerApps?.slice(0, 3).map((app) => (
//                 <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
//                       <HandHeart className="w-5 h-5 text-accent" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Volunteer Application</p>
//                       <p className="text-sm text-muted-foreground">
//                         {new Date(app.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     app.status === "approved" || app.status === "active"
//                       ? "bg-success/10 text-success" 
//                       : app.status === "rejected"
//                       ? "bg-destructive/10 text-destructive"
//                       : "bg-accent/10 text-accent-foreground"
//                   }`}>
//                     {app.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }














// import { createClient } from "@/lib/supabase/server"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { DollarSign, HandHeart, Clock, TrendingUp } from "lucide-react"
// import Link from "next/link"

// export default async function DashboardPage() {
//   const supabase = await createClient()
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle>Not Authenticated</CardTitle>
//             <CardDescription>
//               Please sign in to view your dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button asChild className="w-full">
//               <Link href="/login">Sign In</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   // Fetch all data in parallel for better performance
//   const [donationsResult, volunteerAppsResult, profileResult] = await Promise.all([
//     supabase
//       .from("donations")
//       .select("*")
//       .eq("user_id", user.id)
//       .order("created_at", { ascending: false }),
//     supabase
//       .from("volunteer_applications")
//       .select("*")
//       .eq("user_id", user.id)
//       .order("created_at", { ascending: false }),
//     supabase
//       .from("profiles")
//       .select("first_name, last_name")
//       .eq("id", user.id)
//       .single()
//   ])

//   const donations = donationsResult.data || []
//   const volunteerApps = volunteerAppsResult.data || []

//   // Calculate stats - Count ALL donations regardless of status for Total Donated
//   // Since they show in Recent Activity, they should count in Total Donated
//   const totalDonations = donations.reduce((sum, d) => {
//     // Count all donations except those explicitly marked as failed or refunded
//     if (d.payment_status !== "failed" && d.payment_status !== "refunded" && d.payment_status !== "cancelled") {
//       return sum + Number(d.amount || 0)
//     }
//     return sum
//   }, 0)

//   // Pending donations - only count those that are pending
//   const pendingDonations = donations.filter(d => 
//     d.payment_status === "pending" || 
//     d.payment_status === "processing" ||
//     d.payment_status === "initiated"
//   ).length

//   // Active volunteer applications
//   const activeVolunteerApps = volunteerApps.filter(v => 
//     v.status === "active" || 
//     v.status === "approved" || 
//     v.status === "accepted"
//   ).length

//   // Pending volunteer applications
//   const pendingVolunteerApps = volunteerApps.filter(v => 
//     v.status === "pending" || 
//     v.status === "submitted" ||
//     v.status === "under_review"
//   ).length

//   const firstName = profileResult.data?.first_name || ""
//   const lastName = profileResult.data?.last_name || ""
//   const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || ""

//   const greeting = fullName ? `Welcome back, ${fullName}!` : "Welcome to your Dashboard!"

//   // Debug: Log the donations to see what statuses you have
//   console.log('Total Donations found:', donations.length)
//   console.log('Donation statuses:', donations.map(d => ({ amount: d.amount, status: d.payment_status })))
//   console.log('Total amount calculated:', totalDonations)

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="font-serif text-3xl font-bold text-foreground">{greeting}</h1>
//         <p className="text-muted-foreground mt-2">
//           Track your contributions and engagement with SHAPEthiopia
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">${totalDonations.toFixed(2)}</div>
//             <p className="text-xs text-muted-foreground">
//               Lifetime contributions
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Donations</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingDonations}</div>
//             <p className="text-xs text-muted-foreground">
//               Awaiting processing
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Volunteer Status</CardTitle>
//             <HandHeart className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{activeVolunteerApps}</div>
//             <p className="text-xs text-muted-foreground">
//               Active programs
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingVolunteerApps}</div>
//             <p className="text-xs text-muted-foreground">
//               Under review
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Make a Donation</CardTitle>
//             <CardDescription>
//               Support our programs and help transform lives in Ethiopia
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button asChild>
//               <Link href="/donate">Donate Now</Link>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Become a Volunteer</CardTitle>
//             <CardDescription>
//               Join our team and make a direct impact in communities
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button asChild variant="outline">
//               <Link href="/volunteer">Apply to Volunteer</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Activity</CardTitle>
//           <CardDescription>Your latest donations and volunteer activity</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {(donations.length + volunteerApps.length) === 0 ? (
//             <p className="text-muted-foreground text-center py-8">
//               No activity yet. Start by making a donation or applying to volunteer!
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {donations.slice(0, 3).map((donation) => (
//                 <div key={donation.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
//                       <DollarSign className="w-5 h-5 text-primary" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Donation - ${Number(donation.amount).toFixed(2)}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {new Date(donation.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     donation.payment_status === "completed" || donation.payment_status === "succeeded"
//                       ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
//                       : donation.payment_status === "pending" || donation.payment_status === "processing"
//                       ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
//                       : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
//                   }`}>
//                     {donation.payment_status || "unknown"}
//                   </span>
//                 </div>
//               ))}
//               {volunteerApps.slice(0, 3).map((app) => (
//                 <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
//                       <HandHeart className="w-5 h-5 text-accent" />
//                     </div>
//                     <div>
//                       <p className="font-medium">Volunteer Application</p>
//                       <p className="text-sm text-muted-foreground">
//                         {new Date(app.created_at).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     app.status === "approved" || app.status === "active" || app.status === "accepted"
//                       ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
//                       : app.status === "rejected"
//                       ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
//                       : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
//                   }`}>
//                     {app.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// };




import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, HandHeart, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
            <CardDescription>
              Please sign in to view your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fetch all data in parallel
  const [donationsResult, volunteerAppsResult, profileResult] = await Promise.all([
    supabase
      .from("donations")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("volunteer_applications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", user.id)
      .single()
  ])

  const donations = donationsResult.data || []
  const volunteerApps = volunteerAppsResult.data || []

  // Debug logging - check your browser console to see these
  console.log("=== Dashboard Debug Info ===")
  console.log("User ID:", user.id)
  console.log("Total Donations:", donations.length)
  console.log("Donations:", donations.map(d => ({ amount: d.amount, status: d.payment_status })))
  console.log("Total Volunteer Apps:", volunteerApps.length)
  console.log("Volunteer Apps:", volunteerApps)
  console.log("Profile:", profileResult.data)
  console.log("============================")

  // Calculate total donations - include "succeeded" status from Stripe
  const totalDonations = donations.reduce((sum, d) => {
    if (d.payment_status === "succeeded" || d.payment_status === "completed") {
      return sum + Number(d.amount || 0)
    }
    return sum
  }, 0)

  // Calculate pending donations
  const pendingDonations = donations.filter(d => 
    d.payment_status === "pending" || 
    d.payment_status === "processing" ||
    d.payment_status === "requires_payment_method" ||
    d.payment_status === "requires_action"
  ).length

  // Calculate volunteer stats
  const activeVolunteerApps = volunteerApps.filter(v => 
    v.status === "active" || 
    v.status === "approved" || 
    v.status === "accepted"
  ).length

  const pendingVolunteerApps = volunteerApps.filter(v => 
    v.status === "pending" || 
    v.status === "submitted" ||
    v.status === "under_review"
  ).length

  const firstName = profileResult.data?.first_name || ""
  const lastName = profileResult.data?.last_name || ""
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName || ""

  const greeting = fullName ? `Welcome back, ${fullName}!` : "Welcome to your Dashboard!"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">{greeting}</h1>
        <p className="text-muted-foreground mt-2">
          Track your contributions and engagement with SHAPEthiopia
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Lifetime contributions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Donations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDonations}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteer Status</CardTitle>
            <HandHeart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeVolunteerApps}</div>
            <p className="text-xs text-muted-foreground">
              Active programs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingVolunteerApps}</div>
            <p className="text-xs text-muted-foreground">
              Under review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
            <CardDescription>
              Support our programs and help transform lives in Ethiopia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Become a Volunteer</CardTitle>
            <CardDescription>
              Join our team and make a direct impact in communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/volunteer">Apply to Volunteer</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest donations and volunteer activity</CardDescription>
        </CardHeader>
        <CardContent>
          {(donations.length + volunteerApps.length) === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No activity yet. Start by making a donation or applying to volunteer!
            </p>
          ) : (
            <div className="space-y-4">
              {donations.slice(0, 3).map((donation) => (
                <div key={donation.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Donation - ${Number(donation.amount).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    donation.payment_status === "succeeded" || donation.payment_status === "completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                      : donation.payment_status === "pending" || donation.payment_status === "processing"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}>
                    {donation.payment_status === "succeeded" ? "completed" : donation.payment_status}
                  </span>
                </div>
              ))}
              {volunteerApps.slice(0, 3).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <HandHeart className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Volunteer Application</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.status === "approved" || app.status === "active" || app.status === "accepted"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
              
              {/* Show message if no volunteer apps exist */}
              {volunteerApps.length === 0 && donations.length > 0 && (
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    No volunteer applications yet. 
                    <Link href="/volunteer" className="text-primary hover:underline ml-1">
                      Apply to volunteer →
                    </Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}