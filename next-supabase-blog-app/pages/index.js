import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { supabase } from '../api'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchPosts()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => fetchPosts())
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
    setPosts(data)
    setLoading(false)
  }
  if (loading) return <p className="text-2xl">Loading ...</p>
  if (!posts.length) return <p className="text-2xl">No posts.</p>
  return (
    <div>
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="cursor-pointer border-b border-gray-300">
              <div className="text-sm my-2 font-semibold">{post.title}</div>
              <div className="text-sm my-2">from {post.user_email}</div>
              <div className="text-sm my-2">
                <ReactMarkdown children={post.content} />
              </div>
            </div>
          </Link>)
        )
      }
    </div>
  )
}
