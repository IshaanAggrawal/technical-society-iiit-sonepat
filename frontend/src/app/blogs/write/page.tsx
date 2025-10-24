  "use client";
  import { useState } from "react";
  import { Send, Eye, Code, Save } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import Navigation from "@/sections/Navigation";
  import Footer from "@/sections/Footer";
  
  const BlogWritePage = () => {
    const [markdown, setMarkdown] = useState<string>(`# Your Blog Title
  
  Compose your blog post using Markdown. Use headings, lists, code snippets, links, and quotes.
  
  ## Section 1
  Start writing in **Markdown** format.
  
  - Bullet point 1
  - Bullet point 2
  `);
  
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
  
    // Markdown parser with Enter support
    const parseMarkdown = (text: string) => {
      let html = text;
  
      // Escape HTML
      html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
      // Code blocks
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
        return `<pre><code class="bg-[#1C1C21] text-gray-300 p-4 rounded-lg overflow-x-auto font-mono text-sm my-4 block">${(code || "").trim()}</code></pre>`;
      });
  
      // Inline code
      html = html.replace(/`([^`]+)`/g, '<code class="bg-[#1C1C21] text-primary px-2 py-1 rounded text-sm">$1</code>');
  
      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-semibold text-white mb-2 mt-4">$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-white mb-3 mt-6">$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-white mb-4 mt-8 first:mt-0">$1</h1>');
  
      // Bold & Italic
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
      html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-gray-200">$1</em>');
  
      // Links
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-green-400 underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
  
      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic text-gray-400 my-4">$1</blockquote>');
  
      // Lists
      html = html.replace(/^\- (.*$)/gim, '<li class="text-gray-300">$1</li>');
      html = html.replace(/^\d+\. (.*$)/gim, '<li class="text-gray-300">$1</li>');
      // wrap consecutive <li>...</li> into a <ul> without using the /s flag
      html = html.replace(/((?:<li[\s\S]*?<\/li>)+)/g, '<ul class="list-disc list-inside text-gray-300 mb-4 space-y-2">$1</ul>');
  
      // Paragraphs & line breaks
      html = html
        .split("\n")
        .map((line) => {
          if (!line.trim()) return ""; // empty line
          if (line.startsWith("<")) return line; // already HTML
          return `<p class="text-gray-300 mb-4 leading-relaxed">${line}</p>`;
        })
        .join("\n");
  
      return html;
    };
  
    const MarkdownPreview = ({ content }: { content: string }) => {
      return <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }} />;
    };
  
    const handlePublish = () => {
      console.log({ title, author, tags, content: markdown });
      alert("Blog published successfully!");
    };
  
    const handleSaveDraft = () => {
      console.log("Draft saved");
      alert("Draft saved!");
    };
  
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#0A0A0A] pt-30 ">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Create Your <span className="text-gradient">Blog Post</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Compose your blog post in Markdown and see the live preview. Use headings, lists, code, links, and quotes for a professional layout.
              </p>
            </div>
  
            <div className="glass rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a concise, descriptive title"
                    className="w-full px-4 py-2 bg-[#1C1C21] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Full name of the author"
                    className="w-full px-4 py-2 bg-[#1C1C21] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Comma-separated keywords for SEO"
                    className="w-full px-4 py-2 bg-[#1C1C21] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
  
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
          
              <div className="glass rounded-xl overflow-hidden">
                <div className="bg-[#1C1C21] px-6 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-white">Markdown Editor</span>
                  </div>
                  <span className="text-xs text-gray-400">{markdown.length} characters</span>
                </div>
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full h-[600px] p-6 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
                  placeholder="Compose your blog post using Markdown. Press Enter for new lines."
                  spellCheck={false}
                />
              </div>
  
            
              <div className="glass rounded-xl overflow-hidden">
                <div className="bg-[#1C1C21] px-6 py-3 border-b border-white/10 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-white">Live Preview</span>
                </div>
                <div className="p-6 h-[600px] overflow-y-auto">
                  <MarkdownPreview content={markdown} />
                </div>
              </div>
            </div>
  
          
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button onClick={handleSaveDraft} variant="outline" className="glass glass-hover border-white/10 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} className="button-gradient">
                <Send className="w-4 h-4 mr-2" />
                Publish Blog
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
  export default BlogWritePage;
