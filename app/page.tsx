'use client';

import React, { useState } from 'react';
import { Button } from '../src/components/ui/button';
import { Card } from '../src/components/ui/card';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../src/components/ui/select';
import { Copy, Loader2, Sparkles } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!topic || !platform || !tone) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, platform, tone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setContent(data.content);
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      toast.success('Content copied to clipboard!');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
            AI Content Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Create engaging content for any platform with just a few clicks
          </p>
        </div>

        <Card className="p-6 md:p-8 mb-8 shadow-sm border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-base font-medium text-gray-700 dark:text-gray-200">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic..."
                required
                className="h-11 text-base border-gray-300 bg-white px-3 py-2 text-black placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="platform" className="text-base font-medium text-gray-700 dark:text-gray-200">Platform</Label>
                <Select value={platform} onValueChange={setPlatform} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" className="text-gray-500" />
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
                <Label htmlFor="tone" className="text-base font-medium text-gray-700 dark:text-gray-200">Tone</Label>
                <Select value={tone} onValueChange={setTone} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" className="text-gray-500" />
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

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Content
                </>
              )}
            </Button>
          </form>
        </Card>

        {content && (
          <Card className="p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-100 text-base leading-relaxed">
              {content}
            </div>
          </Card>
        )}
      </div>
    </main>
  );
} 