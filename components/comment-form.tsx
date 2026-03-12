"use client";

import { submitComment } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMMENTS, HTTP_STATUS } from "@/lib/constants";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { getVisitorId } from "./util";

interface CommentFormProps {
  slug: string;
}

type ErrorState =
  | { type: 'message-required' }
  | { type: 'message-too-long'; current: number; max: number }
  | { type: 'name-too-long'; current: number; max: number }
  | { type: 'duplicate-comment' }
  | { type: 'server-error'; message: string }
  | null;

export function CommentForm({ slug }: CommentFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ErrorState>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    const trimmedName = name.trim();

    if (!trimmedMessage) {
      setError({ type: 'message-required' });
      return;
    }

    if (trimmedMessage.length > COMMENTS.MAX_MESSAGE_LENGTH) {
      setError({ type: 'message-too-long', current: trimmedMessage.length, max: COMMENTS.MAX_MESSAGE_LENGTH });
      return;
    }

    if (trimmedName.length > COMMENTS.MAX_NAME_LENGTH) {
      setError({ type: 'name-too-long', current: trimmedName.length, max: COMMENTS.MAX_NAME_LENGTH });
      return;
    }


    const visitorId = getVisitorId();
    const id = `${visitorId}__${slug}`;

    setIsSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('slug', slug);
      formData.append('name', name);
      formData.append('message', message);

      const result = await submitComment(formData);

      if (result.status === HTTP_STATUS.CREATED) {
        setName("");
        setMessage("");
        setError(null);
      } else if (result.status === HTTP_STATUS.CONFLICT) {
        setError({ type: 'duplicate-comment' });
      } else {
        setError({ type: 'server-error', message: result.error || 'Something went wrong' });
      }
    } catch (err) {
      console.error("Failed to submit comment:", err);
      setError({ type: 'server-error', message: 'Network error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
      {error && (<p className="text-red-600 text-center" role="alert">{getErrorMessage(error)}</p>)}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={COMMENTS.MAX_NAME_LENGTH}
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
          maxLength={COMMENTS.MAX_MESSAGE_LENGTH}
        />
      </div>
      <Button type="submit" disabled={isSubmitting || !message.trim()} aria-busy={isSubmitting}>
        <Send className="h-4 w-4" />
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

function getErrorMessage(error: ErrorState): string {
  if (!error) return '';

  switch (error.type) {
    case 'message-required':
      return 'Message is required';
    case 'message-too-long':
      return `Message is too long (${error.current}/${error.max} characters)`;
    case 'name-too-long':
      return `Name is too long (${error.current}/${error.max} characters)`;
    case 'duplicate-comment':
      return 'Only one comment per user.';
    case 'server-error':
      return error.message || 'Something went wrong';
  }
}
