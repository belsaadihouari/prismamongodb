"use client";
import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
const CardProduct = ({ title, descrip, id, createdBy, deleted,iduser }) => {
  const controls = useAnimation();
  const router = useRouter();
  async function handlerdelete(id) {
    const res = await fetch(
      `http://localhost:3000/api/delete/deleteproductone/${id}`
    ,{
      cache:"no-cache",
    });
    const data = await res.json();
    router.push("/products");
  }



  async function handlerrestaure(iduser) {
    
    const res = await fetch(
      `http://localhost:3000/api/restore/restoreUser/${iduser}`
    ,{
      cache:"no-cache",
    });
    const data = await res.json();
    router.push("/");
  }
  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transform: "translateY(0%)",
    });
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1, transform: "translateY(5%)" }}
      animate={controls}
      transition={{ duration: 1 }}
      className="card"
    >
      <div className="card">
        <IconButton
          size="small"
          edge="start"
          color="secondary"
          aria-label="menu"
          className="cross"
          onClick={() => {
            handlerdelete(id);
          }}
        >
          <CloseIcon className="crossicon" />
        </IconButton>
        <div className="containerdetails">
          <h3>{title}</h3>
          <h6>{descrip}</h6>
          <h6>Created By: {createdBy}</h6>
          <h6 style={{ color: "Black", fontSize: "15px" }}>
            {deleted && "User has been Deleted"}
          </h6>
          {deleted && (
            <button onClick={() => {
              handlerrestaure(iduser)
            }} style={{ padding: "6px", cursor: "pointer" }}>
              Restore user
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CardProduct;
