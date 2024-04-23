// Complete the Index page component here
// Use chakra-ui and react-icons for UI and icons
import React, { useState, useEffect } from "react";
import { Box, Button, Input, VStack, Text, useToast, IconButton, Heading, Container } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const toast = useToast();

  const fetchNotes = async () => {
    const response = await fetch("https://mnwefvnykbgyhbdzpleh.supabase.co/rest/v1/notes", {
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg",
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    const response = await fetch("https://mnwefvnykbgyhbdzpleh.supabase.co/rest/v1/notes", {
      method: "POST",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg",
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ note }),
    });
    const newNote = await response.json();
    setNotes([...notes, newNote[0]]);
    setNote("");
    toast({
      title: "Note added",
      description: "Your note has been added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditNote = async (id) => {
    const response = await fetch(`https://mnwefvnykbgyhbdzpleh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg",
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ note }),
    });
    const updatedNote = await response.json();
    setNotes(notes.map((n) => (n.id === id ? updatedNote[0] : n)));
    setNote("");
    setEditingId(null);
    toast({
      title: "Note updated",
      description: "Your note has been updated successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteNote = async (id) => {
    await fetch(`https://mnwefvnykbgyhbdzpleh.supabase.co/rest/v1/notes?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2Vmdm55a2JneWhiZHpwbGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNzQ3MzQsImV4cCI6MjAyODg1MDczNH0.tnHysd1LqayzpQ1L-PImcvlkUmkNvocpMS7tS-hYZNg",
        "Content-Type": "application/json",
      },
    });
    setNotes(notes.filter((n) => n.id !== id));
    toast({
      title: "Note deleted",
      description: "Your note has been deleted successfully.",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md">
      <VStack spacing={4} align="stretch">
        <Heading mb={4}>Notes App</Heading>
        <Box>
          <Input placeholder="Enter your note here..." value={note} onChange={(e) => setNote(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={editingId ? () => handleEditNote(editingId) : handleAddNote}>
            {editingId ? "Update Note" : "Add Note"}
          </Button>
        </Box>
        {notes.map((n) => (
          <Box key={n.id} p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl">{n.note}</Text>
            <IconButton
              aria-label="Edit note"
              icon={<FaEdit />}
              onClick={() => {
                setNote(n.note);
                setEditingId(n.id);
              }}
            />
            <IconButton aria-label="Delete note" icon={<FaTrash />} onClick={() => handleDeleteNote(n.id)} />
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
