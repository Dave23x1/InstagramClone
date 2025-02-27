"use client";
import { useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { authToken: token } = parseCookies();

  useEffect(() => {
    if (!token) return;

    const decoded = jwt.decode(token);
    if (!decoded?.username) return console.error("Invalid token");

    fetch(`/api/user/${decoded.username}`)
      .then((res) => (res.ok ? res.json() : Promise.reject("User not found")))
      .then(setUser)
      .catch(console.error);
  }, [token]);

  const handleUpload = async (file) => {
    if (!file || !user?.username) return;

    setLoading(true); // Show loading state
    setShowModal(false); // Close modal

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", user.username);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setUser((prev) => ({ ...prev, profile: data.profile }));
    } catch (error) {
      console.error("Upload Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user?.username) return;

    setLoading(true);
    setShowModal(false);

    try {
      const response = await fetch("/api/remove-photo", {
        method: "POST",
        body: JSON.stringify({ username: user.username }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(await response.text());

      setUser((prev) => ({ ...prev, profile: null }));
    } catch (error) {
      console.error("Remove Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full mx-auto container px-36  pt-[60px]">
      {user ? (
        <div className="px-[330px] flex gap-[50px]">
          <div
            className="w-[180px] h-[180px]  rounded-full cursor-pointer border border-[#262727] overflow-hidden flex items-center "
            onClick={() => setShowModal(true)}
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#0978C3] rounded-full animate-spin"></div>
            ) : (
              <Image
                src={user.profile}
                alt="Profile"
                height={170}
                width={170}
                className="w-full h-full object-cover "
              />
            )}
          </div>
          <div className="flex flex-col gap-[50px]">
            <div className="flex gap-[30px]">
              <div>
                <p className=" font-bold text-lg">{user.username}</p>
              </div>
              <div className="flex gap-[10px]">
                <div className="">
                  <button className="bg-[#3e3e3e] hover:bg-[#282828] py-1 px-2 rounded-md">
                    Edit profile
                  </button>
                </div>
                <div className="">
                  <button className="bg-[#3e3e3e] hover:bg-[#282828] py-1 px-2 rounded-md">
                    View archive
                  </button>
                </div>
                <div className="flex items-center">
                  <svg
                    aria-label="Options"
                    className="x1lliihq x1n2onr6 x5n08af"
                    fill="currentColor"
                    height="26"
                    role="img"
                    viewBox="0 0 24 24"
                    width="26"
                  >
                    <title>Options</title>
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      r="8.635"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-[45px] ">
              <div>
                <p className=" text-[#b9b9b9] text-lg">posts</p>
              </div>

              <div className="">
                <button className="text-[#b9b9b9] text-lg">followers</button>
              </div>
              <div className="">
                <button className="text-[#b9b9b9] text-lg">following</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>User not found.</p>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            handleUpload(e.target.files[0]);
          }
        }}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#272627] rounded-xl shadow-lg w-[400PX] text-center">
            <div className="py-[30px] border-b-[#3e3d3e] border border-t-0 border-l-0 border-r-0 ">
              <h2 className=" text-2xl">Change Profile Picture</h2>
            </div>

            <div className="flex flex-col gap-3 ">
              <button
                className="text-[#0978C3] font-semibold py-3  border-b-[#3e3d3e] border border-t-0 border-l-0 border-r-0"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Photo
              </button>

              {user.profile && (
                <button
                  className="text-[#E74854] font-semibold py-3  border-b-[#3e3d3e] border border-t-0 border-l-0 border-r-0 "
                  onClick={handleRemovePhoto}
                >
                  Remove Current Photo
                </button>
              )}

              <button
                className="text-white px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
