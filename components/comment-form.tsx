"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { getErrorText, getVisitorId } from "./util";

interface CommentFormProps {
  slug: string;
  onCommentSubmitted: () => void;
}

export function CommentForm({ slug, onCommentSubmitted }: CommentFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    const trimmedName = name.trim();
    const visitorId = getVisitorId();
    const id = `${visitorId}__${slug}`;

    if (!trimmedMessage) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          slug,
          name: trimmedName,
          message: trimmedMessage,
        }),
      });

      if (response.status === 409) {
        const err = getErrorText(response.status);
        setError(err);
      }

      if (response.status === 201) {
        if (onCommentSubmitted) {
          onCommentSubmitted();
        }
        setError("");
      }
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
      {error && (<p className="text-red-600 text-center">{error}</p>)}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your comment..."
          required
          rows={4}
        />
      </div>
      <Button type="submit" disabled={isSubmitting || !message.trim()}>
        <Send className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

