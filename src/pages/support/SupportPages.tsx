import { Link } from 'react-router-dom';
import { SupportPageLayout } from './SupportLayout';

export const FeaturesPage = () => (
  <SupportPageLayout title="Features" description="Everything you need to manage your GitHub network.">
    <div className="prose">
      <h3>Analyze Relationships</h3>
      <p>Find out exactly who doesn't follow you back and who your biggest fans are. We use the GitHub API to check your connections and give you a clear list of everyone in your network.</p>
      <ul>
        <li>See Non-Mutuals instantly</li>
        <li>Find your fans (who you don't follow back)</li>
        <li>Track progress as we scan your profile</li>
      </ul>
      
      <h3>Bulk Management</h3>
      <p>Stop unfollowing people one by one. Our bulk tools let you manage hundreds of users with a single click. We've built in smart delays so you don't hit GitHub's rate limits while you're cleaning up.</p>
      <ul>
        <li>Unfollow non-mutuals in bulk</li>
        <li>Follow back all your fans at once</li>
        <li>Stop or pause anytime you want</li>
      </ul>

      <h3>Detailed Profiles</h3>
      <p>Get the full picture for any user. See their bio, how many repos they have, and how long they've been on GitHub—all without leaving the dashboard.</p>
    </div>
  </SupportPageLayout>
);

export const HowItWorksPage = () => (
  <SupportPageLayout title="How It Works" description="Simple, secure, and stays in your browser.">
    <div className="prose">
      <h3>1. Connect Securely</h3>
      <p>You use a GitHub Classic Token with <code>read:user</code> and <code>user:follow</code> permissions. This token stays locked in your browser's local storage—it never goes anywhere else.</p>
      
      <h3>2. Direct Communication</h3>
      <p>The app talks directly to GitHub from your computer. There are no middleman servers watching your data or handling your token.</p>
      
      <h3>3. Local Processing</h3>
      <p>All the heavy lifting and connection checks happen right on your machine. This makes it fast, private, and secure by default.</p>
    </div>
  </SupportPageLayout>
);

export const PrivacyPage = () => (
  <SupportPageLayout title="Privacy Policy" description="Your data never leaves your computer.">
    <div className="prose">
      <h3>No Data Collection</h3>
      <p>I don't collect or store any of your personal info, tokens, or network data. This tool is built to be a private utility for you to use on your own hardware.</p>
      
      <h3>Local Storage Only</h3>
      <p>If you choose to save your token for later, it's stored in your browser's <code>localStorage</code>. You can wipe this clean anytime from the dashboard or your browser settings.</p>
      
      <h3>No Trackers</h3>
      <p>There are no tracking scripts, analytics, or cookies here. Just simple, direct communication with GitHub's official API.</p>
    </div>
  </SupportPageLayout>
);

export const TermsPage = () => (
  <SupportPageLayout title="Terms of Service" description="Straightforward terms for an open-source tool.">
    <div className="prose">
      <h3>Open Source</h3>
      <p>This is MIT Licensed software. You're free to check the code, change it, or contribute to it on GitHub.</p>
      
      <h3>Your Responsibility</h3>
      <p>While I've built in safety features to honor GitHub's rate limits, you're responsible for how you use the tool. Make sure you're following GitHub's rules when managing your account.</p>
    </div>
  </SupportPageLayout>
);

export const FAQPage = () => (
  <SupportPageLayout title="FAQ" description="Quick answers to common questions.">
    <div className="prose">
      <h3>Is this safe for my account?</h3>
      <p>Yes. The tool runs entirely in your browser and uses official GitHub methods. It doesn't share your token or do anything behind your back.</p>
      
      <h3>Why do I need a token?</h3>
      <p>GitHub needs to know it's really you before it lets the app follow or unfollow people for you. A 'Classic' token is the simplest way to get this working.</p>
      
      <h3>What's a 'Non-Mutual'?</h3>
      <p>It's someone you follow, but they don't follow you back. This tool helps you find them so you can decide if you want to keep following them.</p>
    </div>
  </SupportPageLayout>
);

export const ContactPage = () => (
  <SupportPageLayout title="Contact" description="Get in touch if you have questions.">
    <div className="prose">
      <p>Have a question or want to share some feedback? Hop on any of these channels to reach me:</p>
      <ul>
        <li>Email: <a href="mailto:arshverma.dev@gmail.com">arshverma.dev@gmail.com</a></li>
        <li>X: <a href="https://x.com/TheArshVerma">@TheArshVerma</a></li>
        <li>GitHub: <a href="https://github.com/ArshVermaGit">@ArshVermaGit</a></li>
      </ul>
    </div>
  </SupportPageLayout>
);

export const DisclaimerPage = () => (
  <SupportPageLayout title="Disclaimer" description="Important info about tool usage.">
    <div className="prose">
      <h3>No Warranty</h3>
      <p>I provide this software as-is. I'm not responsible for any issues with your GitHub account, though the tool is designed to be safe and follows official API guidelines.</p>
      <h3>Not Affiliated with GitHub</h3>
      <p>This is an independent project made by me. It's not sponsored, endorsed, or managed by GitHub, Inc.</p>
    </div>
  </SupportPageLayout>
);

export const CookiePolicyPage = () => (
  <SupportPageLayout title="Cookie Policy" description="No cookies, just local storage.">
    <div className="prose">
      <h3>Clean & Simple</h3>
      <p>I don't use cookies to track you. The only thing saved is your GitHub token and username in local storage, only if you want it there for convenience.</p>
    </div>
  </SupportPageLayout>
);

export const ChangelogPage = () => (
  <SupportPageLayout title="Changelog" description="How the tool has evolved.">
    <div className="prose">
      <h3>Major Redesign</h3>
      <p>Moved to a sleek monochrome design, added 10+ new supporting pages, and improved overall performance.</p>
      <h3>Bulk Actions</h3>
      <p>Added the ability to handle hundreds of users at once with smart rate-limit protection.</p>
      <h3>Initial Release</h3>
      <p>The first version that helped identify non-mutual connections and fans.</p>
    </div>
  </SupportPageLayout>
);

export const SitemapPage = () => (
  <SupportPageLayout title="Sitemap" description="Every corner of the app.">
    <div className="prose">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/how-it-works">How It Works</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms">Terms of Service</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>
    </div>
  </SupportPageLayout>
);
