import Hacker from "@/lib/hacker";

const Blog = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="bg-muted/30 pb-10">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Bookstar Blog
            </h1>
            <Hacker />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
