// "use client"
// import { useEffect,useState } from "react"
// import { supabase } from "@/src/lib/supabaseClient"
// import { useRouter } from "next/navigation"



// export default function Dashboard(){

//     const router = useRouter()

//     const [bookmarks,setBookmarks]=useState<any[]>([])
//     const [title,setTitle]=useState("")
//     const [url,setUrl]=useState("")



// useEffect(() => {
//   let channel: any

//   const setupRealtime = async () => {
//     const { data: { session } } = await supabase.auth.getSession()

//     if (!session) {
//       console.log("No session found")
//       return
//     }

//     console.log("Session found")

//     fetchBookmarks()

//     channel = supabase
//       .channel("realtime-bookmarks")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "bookmarks",
//         },
//         (payload) => {
//           console.log("Realtime triggered:", payload)
//           fetchBookmarks()
//         }
//       )
//       .subscribe((status) => {
//         console.log("Subscription status:", status)
//       })
//   }

//   setupRealtime()

//   return () => {
//     if (channel) {
//       supabase.removeChannel(channel)
//     }
//   }

// }, [])

//     // const fetchBookmarks = async()=>{
//     //     const { data } = await supabase
//     //     .from("bookmarks")
//     //     .select("*")
//     //     .order("created_at",{ascending:false})

//     //     setBookmarks(data || [])

//     // }
//     const fetchBookmarks = async () => {
//   const { data: userData } = await supabase.auth.getUser()

//   if (!userData.user) return

//   const { data } = await supabase
//     .from("bookmarks")
//     .select("*")
//     .eq("user_id", userData.user.id) // 👈 filter here
//     .order("created_at", { ascending: false })

//   setBookmarks(data || [])
// }

//     const addBookmark =async()=>{
//         const { data:userData } = await supabase.auth.getUser()

//         await supabase.from("bookmarks").insert({
//             title,
//             url,
//             user_id:userData.user?.id
//         })

//         setTitle("")
//         setUrl("")

//         fetchBookmarks()

//     }

//     const deleteBookmark = async (id:string) =>{
//         await supabase.from("bookmarks").delete().eq("id",id)
//           fetchBookmarks() 
//     }

//     const handleLogout = async () => {
//         await supabase.auth.signOut()
//         router.push("/")
//     }
//     return (
//         <div className="p-10">
//              <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold">My Bookmarks</h1>
//                 <button 
//                     onClick={handleLogout}
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                     Logout
//                 </button>
//             </div>
           
//             <div className="flex gap-5 mb-6">
//                 <input 
//                 placeholder="Title"
//                 className="border p-2 text-center"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                  />
                 
//                 <input 
//                 placeholder="URL"
//                 className="border p-2 w-96 text-center"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                  />

//                  <button onClick={addBookmark}
//                  className="bg-green-500 text-white px-4 rounded">
//                     ADD
//                  </button>
//             </div>
//              <div className="space-y-4">
//                 {bookmarks.map((b)=>(
//                     <div key={b.id} className="border p-4 flex justify-between">
//                         <a href={b.url} target="_blank" className="text-blue-600">
//                             {b.title}
//                         </a>
//                         <button
//                         onClick={()=>deleteBookmark(b.id)}
//                         className="text-red-500">
//                             Delete
//                         </button>
//                     </div>
//                 ))}

//              </div>
//         </div>
//     )
// }



"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // Fetch bookmarks for current user
  const fetchBookmarks = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { data } = await supabase
      .from("bookmarks")
      
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    setBookmarks((data || []) as Bookmark[]);
  };

  // Setup real-time subscription
  useEffect(() => {
    let channel: any;

    const setupRealtime = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      fetchBookmarks();

      channel = supabase
        .channel("realtime-bookmarks")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "bookmarks" },
          () => fetchBookmarks()
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // Add bookmark
  const addBookmark = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: userData.user.id,
    });

    setTitle("");
    setUrl("");
    fetchBookmarks();
  };

  // Delete bookmark
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-5 mb-6">
        <input
          placeholder="Title"
          className="border p-2 text-center"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="URL"
          className="border p-2 w-96 text-center"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={addBookmark}
          className="bg-green-500 text-white px-4 rounded"
        >
          ADD
        </button>
      </div>

      <div className="space-y-4">
        {bookmarks.map((b) => (
          <div key={b.id} className="border p-4 flex justify-between">
            <a href={b.url} target="_blank" className="text-blue-600">
              {b.title}
            </a>
            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
