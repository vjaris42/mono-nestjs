"use client"

import { useState, useEffect } from "react"

export function UserManagement() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simple test - just set loading to false after 1 second
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <p>This is a simple test version to check if the component loads.</p>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold">Test Stats</h2>
        <div className="grid grid-cols-4 gap-4 mt-2">
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm font-medium">Total Users</div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm font-medium">Active Users</div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm font-medium">Admin Users</div>
            <div className="text-2xl font-bold">0</div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm font-medium">Growth Rate</div>
            <div className="text-2xl font-bold">0%</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Users Table (Test)</h3>
        <div className="border rounded">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-t">Test User</td>
                <td className="p-2 border-t">test@example.com</td>
                <td className="p-2 border-t">Admin</td>
                <td className="p-2 border-t">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
