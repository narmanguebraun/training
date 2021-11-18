import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { supabase } from '../api'

export default function MyPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const user = supabase.auth.user()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .filter('user_id', 'eq', user.id)
    setPosts(data)
  }
  async function deletePost(id) {
    await supabase
      .from('posts')
      .delete()
      .match({ id })
    fetchPosts()
  }
  return (
    <div>
      {
        posts.map((post, index) => (
          <div key={index} className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
            <p className="text-sm my-4 font-semibold">{post.title}</p>
            <p className="text-sm my-4">from {post.user_email}</p>
            <div className="text-sm my-4">
              <ReactMarkdown children={post.content} />
            </div>
            <Link href={`/edit-post/${post.id}`}><a className="text-sm mr-4 text-blue-700">Edit</a></Link>
            <Link href={`/posts/${post.id}`}><a className="text-sm mr-4 text-blue-700">View</a></Link>
            <button
              className="text-sm my-4 text-red-500"
              onClick={() => deletePost(post.id)}
            >Delete</button>
          </div>
        ))
      }
    </div>
  )
  
}