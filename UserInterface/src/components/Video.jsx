//      Video.jsx (with comment section integrated) 
import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Link, useParams } from 'react-router-dom'; 
 
const Video = () => { 
  const { id } = useParams(); 
  const [videoData, setVideoData] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(""); 
 
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { year: 
'numeric', month: 'long' }); 
 
  useEffect(() => { 
    const fetchVideo = async () => { 
      try { 
        const res = await axios.get(`/api/v1/videos/videoData/${id}`); 
        setVideoData(res.data.data); 
      } catch (err) { 
        setError(err.message); 
      } finally { 
        setLoading(false); 
      } 
    }; 
    fetchVideo(); 
  }, [id]); 
 
  useEffect(() => { 
    axios.put(`/api/v1/videos/incrementView/${id}`).catch(console.error); 
    axios.put(`/api/v1/account/addToHistory/${id}`).catch(console.error); 
  }, [id]); 
 
  useEffect(() => { 
    if (videoData?.owner) { 
      axios.get(`/api/v1/account/userData/${videoData.owner}`) 
        .then((res) => setUserData(res.data.data)) 
        .catch(console.error); 
    } 
  }, [videoData]); 
 
  useEffect(() => { 
    axios.get(`/api/v1/comments/${id}`) 
      .then((res) => setComments(res.data.data)) 
      .catch(console.error); 
  }, [id]); 
 
  const handleAddComment = async () => { 
    if (!newComment.trim()) return; 
    try { 
      await axios.post(`/api/v1/comments/add`, { videoId: id, text: newComment }); 
      const res = await axios.get(`/api/v1/comments/${id}`); 
      setComments(res.data.data); 
      setNewComment(""); 
    } catch (err) { 
      console.error("Failed to add comment", err); 
    } 
  }; 
 
  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>; 
  if (!videoData) return <div>No video found.</div>; 
 
  return ( 
    <div className="lg:mt-8 bg-white grid grid-cols-1 px-8 pt-6 xl:grid-cols-3 xl:gap-4"> 
      <div className="col-span-full"> 
        <section className="pb-5 mt-3"> 
          <div className="relative video-wrap" style={{ height: "465px" }}> 
            <video className="w-full h-full" controls> 
              <source src={videoData.videoFile} type="video/mp4" /> 
              Your browser does not support the video tag. 
            </video> 
          </div> 
 
          <h1 className="text-xl font-semibold mt-4">{videoData.title}</h1> 
          <p className="text-gray-600 mt-1">{videoData.description}</p> 
 
          {/*      Comment Section */} 
          <div className="mt-8"> 
            <h2 className="text-lg font-bold mb-4">Comments</h2> 
            <div className="flex gap-2 mb-4"> 
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="flex-grow border px-3 py-2 rounded shadow" 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} 
              /> 
              <button 
                onClick={handleAddComment} 
                className="bg-black text-white px-4 py-2 rounded" 
              > 
                Post 
              </button> 
            </div> 
 
            {comments.length === 0 ? ( 
              <p className="text-gray-500">No comments yet. Be the first to comment!</p> 
            ) : ( 
              <ul className="space-y-4"> 
                {comments.map((comment) => ( 
                  <li key={comment._id} className="border-b pb-2"> 
                    <div className="flex items-center gap-3"> 
                      <img src={comment.userId.avatar} alt="avatar" className="w-8 h-8 rounded-full" 
/> 
                      <span className="font-medium">{comment.userId.name}</span> 
                      <span className="text-xs text-gray-400 ml
auto">{formatDate(comment.timestamp)}</span> 
                    </div> 
                    <p className="ml-11 text-sm text-gray-700">{comment.text}</p> 
                  </li> 
                ))} 
              </ul> 
            )} 
          </div> 
        </section> 
      </div> 
    </div> 
  ); 
}; 
 
export default Video; 