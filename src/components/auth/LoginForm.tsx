import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { SignIn } from "@clerk/clerk-react";

export const LoginForm: React.FC = () => {
 

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SignIn />
      </motion.div>
    </Box>
  );
};
