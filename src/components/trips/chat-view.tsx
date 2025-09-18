'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from '@/lib/hooks';
import type { ChatMessage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

const mockUsers = [
  { name: 'You', avatar: 'https://picsum.photos/seed/user1/40/40' },
  { name: 'Jane Doe', avatar: 'https://picsum.photos/seed/user2/40/40' },
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    user: 'Jane Doe',
    avatar: 'https://picsum.photos/seed/user2/40/40',
    message: "Hey, is everyone excited for Paris? I can't wait!",
    timestamp: new Date().getTime() - 1000 * 60 * 5,
  },
  {
    id: '2',
    user: 'You',
    avatar: 'https://picsum.photos/seed/user1/40/40',
    message: 'Absolutely! I just packed my bags. Have you checked the weather?',
    timestamp: new Date().getTime() - 1000 * 60 * 3,
  },
];

export default function ChatView({ tripId }: { tripId: string }) {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>(`chat-${tripId}`, mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, you would connect to Firestore here and listen for new messages.
    // For now, we just scroll to the bottom when messages change.
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const scrollableView = scrollAreaRef.current.querySelector('div');
        if (scrollableView) {
            scrollableView.scrollTo({ top: scrollableView.scrollHeight });
        }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const currentUser = mockUsers[0];
    const message: ChatMessage = {
      id: new Date().toISOString(),
      user: currentUser.name,
      avatar: currentUser.avatar,
      message: newMessage,
      timestamp: new Date().getTime(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Card className="flex flex-col h-[70vh]">
      <CardHeader>
        <CardTitle>Trip Chat</CardTitle>
        <CardDescription>Discuss plans with your fellow travelers.</CardDescription>
        <div className="flex items-center space-x-2 pt-2">
            <div className="flex items-center -space-x-2">
                {mockUsers.map(user => (
                    <Avatar key={user.name} className="border-2 border-background">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
            <span className="text-sm text-muted-foreground">{mockUsers.length} people online</span>
        </div>
      </CardHeader>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <CardContent>
            <div className="space-y-6">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.user === 'You' ? 'justify-end' : ''}`}>
                 {msg.user !== 'You' && (
                    <Avatar>
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                 )}
                <div className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-lg px-4 py-2 max-w-sm ${msg.user === 'You' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{msg.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                        {msg.user} - {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                    </span>
                </div>
                 {msg.user === 'You' && (
                    <Avatar>
                        <AvatarImage src={msg.avatar} />
                        <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                 )}
                </div>
            ))}
            </div>
        </CardContent>
      </ScrollArea>
      <CardFooter className="pt-6">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
