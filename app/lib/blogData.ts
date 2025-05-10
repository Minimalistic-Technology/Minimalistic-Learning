// lib/blogData.ts

export const blogs = [
    {
      id: "1",
      title: "Understanding Artificial Intelligence: A Beginner's Guide",
      description: "Learn the basics of AI, how it works, and why it’s transforming industries worldwide.",
      category: "AI",
      image: "https://plurilock.com/wp-content/uploads/2024/02/dreamstime_m_171270756-1024x683.jpg",
      date: "April 20, 2025",
      author: "Manan Doshi",
      content: `
  <p>Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans.</p>

  <h2>What is AI?</h2>
  <p>AI enables machines to mimic cognitive functions such as learning, problem-solving, and decision-making. It is categorized into:</p>
  <ul>
    <li><strong>Narrow AI:</strong> Specialized in one task, e.g., facial recognition.</li>
    <li><strong>General AI:</strong> Performs any intellectual task a human can do (still theoretical).</li>
    <li><strong>Super AI:</strong> Surpasses human intelligence (hypothetical).</li>
  </ul>

  <h2>Applications of AI</h2>
  <p>AI is revolutionizing industries in many ways:</p>
  <ul>
    <li><strong>Healthcare:</strong> Diagnosing diseases, personalized treatments, robotic surgeries.</li>
    <li><strong>Finance:</strong> Fraud detection, algorithmic trading, chatbots.</li>
    <li><strong>Transportation:</strong> Self-driving cars, traffic management systems.</li>
    <li><strong>Retail:</strong> Personalized recommendations, customer service automation.</li>
  </ul>

  <h2>Key AI Techniques</h2>
  <p>Some common AI techniques include:</p>
  <ul>
    <li><strong>Machine Learning (ML):</strong> Algorithms that learn from data and improve over time.</li>
    <li><strong>Natural Language Processing (NLP):</strong> Understanding and generating human language.</li>
    <li><strong>Computer Vision:</strong> Interpreting visual data like images or videos.</li>
    <li><strong>Expert Systems:</strong> Mimic decision-making abilities of human experts.</li>
  </ul>

  <h2>Simple Machine Learning Example</h2>
  <p>Here’s a simple Python example of training a machine learning model using scikit-learn:</p>
  <pre><code class="language-python">
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load dataset
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.3, random_state=42)

# Train model
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Predict
predictions = clf.predict(X_test)
print(predictions)
  </code></pre>

  <h2>The Future of AI</h2>
  <p>AI continues to evolve with advancements in quantum computing, neuromorphic engineering, and ethical AI frameworks. As AI becomes more integrated into society, it’s important to focus on transparency, accountability, and bias mitigation to ensure responsible deployment.</p>

  <blockquote>
    "The real question is, when will we draft an artificial intelligence bill of rights? What will that consist of? And who will get to decide that?" – Gray Scott
  </blockquote>

  <p>Understanding AI today means being prepared for the technological revolutions of tomorrow. Whether you're a student, developer, or enthusiast, diving into AI is a rewarding investment.</p>
`
    },
    {
      id: "2",
      title: "Top 10 Web Development Trends in 2025",
      description: "Stay ahead of the curve with these web development trends shaping the tech world.",
      category: "Web Development",
      image: "https://blog.zegocloud.com/wp-content/uploads/2024/03/types-of-web-development-services.jpg",
      date: "April 18, 2025",
      author: "Sunny Radhakrishna",
      content: `
        <p>Web development in 2025 is driven by AI-powered code generation, serverless computing, and progressive web apps (PWAs).</p>
        <p>Keeping up with trends ensures competitiveness in the tech industry.</p>
      `,
    },
    {
      id: "3",
      title: "A Deep Dive into Blockchain Technology",
      description: "Explore how blockchain works and why it’s revolutionizing digital transactions.",
      category: "Blockchain",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RtGzBqVn9mzH1A7xCElSkgtkyFCD2Adkgw&s",
      date: "March 25, 2025",
      author: "Sandip Baranwal",
      content: `
        <p>Blockchain is a decentralized ledger that records transactions across many computers securely and immutably.</p>
        <p>It is the backbone of cryptocurrencies and is being adopted in industries like supply chain and healthcare.</p>
      `,
    },
    {
      id: "4",
      title: "Getting Started with Machine Learning",
      description: "A practical introduction to ML for students and beginners.",
      category: "AI",
      image: "https://opini.ukwms.ac.id/wp-content/uploads/2024/07/blockchain1-1.jpg",
      date: "March 10, 2025",
      author: "Manan Doshi",
      content: `
        <p>Machine Learning is a subset of AI that allows systems to learn from data and improve over time without being explicitly programmed.</p>
        <p>Common applications include spam detection, recommendation systems, and image recognition.</p>
      `,
    },
    {
      id: "5",
      title: "The Rise of DevOps: Why It Matters in 2025",
      description: "Learn why DevOps is a key discipline in modern software development teams.",
      category: "DevOps",
      image: "https://cdn.mos.cms.futurecdn.net/pL5rBKGq88cnoqgdJgCXGS.jpg",
      date: "April 5, 2025",
      author: "Sadashiv zore",
      content: `
        <p>DevOps integrates development and operations teams to improve collaboration, speed, and product quality.</p>
        <p>Automation, CI/CD, and monitoring are crucial aspects of a successful DevOps practice.</p>
      `,
    },
    {
      id: "6",
      title: "Mastering Tailwind CSS for Scalable UI Design",
      description: "Discover the power of utility-first CSS and how Tailwind makes UI development fast and responsive.",
      category: "Web Development",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0BKyZk7T4dZWB9sE7B3dxn0oSkYRnNTPh2A&s",
      date: "April 12, 2025",
      author: "Mahesh Kumar Thever",
      content: `
        <p>Tailwind CSS provides low-level utility classes that let you build fully custom UI without writing custom CSS.</p>
        <p>It helps teams maintain consistent designs while speeding up development time.</p>
      `,
    },
  ];
  