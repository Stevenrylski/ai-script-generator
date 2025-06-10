'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const platforms = [
  { value: 'blog', label: 'Blog Post' },
  { value: 'social', label: 'Social Media' },
  { value: 'email', label: 'Email Newsletter' },
  { value: 'product', label: 'Product Description' },
];

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'humorous', label: 'Humorous' },
];

export default function Home() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('');
  const [tone, setTone] = useState('');

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      topic,
      platform,
      tone,
    },
  });

  const handleCopy = async () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content) {
      await navigator.clipboard.writeText(lastMessage.content);
      toast.success('Content copied to clipboard!');
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">
        AI Content Generator
      </h1>

      <Card className="p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Content'
            )}
          </Button>
        </form>
      </Card>

      {messages.length > 0 && (
        <Card className="p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <div className="prose dark:prose-invert max-w-none">
            {messages[messages.length - 1].content}
          </div>
        </Card>
      )}
    </main>
  );
} 