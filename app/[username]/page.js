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
      setLoading(false); // Hide loading state
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
        <div className="px-[330px] flex gap-[90px]">
          <div
            className="w-[150px] h-[150px]  rounded-full cursor-pointer border border-[#262727] overflow-hidden flex items-center "
            onClick={() => setShowModal(true)}
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#0978C3] rounded-full animate-spin"></div>
            ) : (
              <Image
                src={user.profile}
                alt="Profile"
                height={150}
                width={150}
                className="w-full h-full object-cover "
              />
            )}
          </div>
          <div>
            <p className="mt-3 font-bold text-lg">{user.username}</p>
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
