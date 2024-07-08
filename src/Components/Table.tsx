import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { boxStyles } from "./css/table-styles"

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const HomeComponent1: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (response.status != 200) {
          throw new Error("Failed to load data");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchPosts();
  }, []);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];
  return (
    <div>
      <Box sx={boxStyles}>
        <DataGrid rows={posts} columns={columns} checkboxSelection />
      </Box>
    </div>
  );
};

export default HomeComponent1;
