# Analytics & Monitoring Setup Guide

This guide covers the analytics and monitoring setup for akshaykrjain.github.io.

## ✅ Current Analytics Setup

### Google Analytics 4 (Active)
- **Measurement ID**: G-E5TVCPFT5N
- **Stream Name**: akshay-base
- **Stream URL**: https://akshay-project-19477.firebaseapp.com
- **Stream ID**: 3019249397
- **Status**: ✅ Implemented and Active

**Dashboard Access**: [Google Analytics Dashboard](https://analytics.google.com/analytics/web/#/p3019249397)

## 📊 What's Being Tracked

### Automatic Tracking:
- **Page Views**: Every page visit
- **Session Duration**: How long visitors stay
- **Bounce Rate**: Single-page visits
- **Traffic Sources**: Where visitors come from
- **Geographic Data**: Visitor locations
- **Device Information**: Mobile vs desktop usage

### Custom Events:
- **Scroll Depth**: 25%, 50%, 75%, 100% page scroll
- **External Links**: LinkedIn, GitHub, email clicks
- **Contact Form**: Submissions and field interactions
- **Skill Interactions**: Clicks on skill tags
- **Form Validation**: Success/error events

## 🔍 Analytics Options

### 1. Google Analytics 4 (Recommended)

**Setup Steps:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Uncomment and update the Google Analytics code in `index.html`
5. Replace `GA_MEASUREMENT_ID` with your actual ID

**What you get:**
- Visitor count and demographics
- Page views and session duration
- Traffic sources (direct, search, social)
- Real-time visitor tracking
- Mobile vs desktop usage
- Geographic data

### 2. GitHub Repository Insights

**Built-in GitHub Features:**
- Go to your repository → Insights tab
- **Traffic**: Views and unique visitors (last 14 days)
- **Clones**: Repository clone statistics
- **Referrers**: Sites that link to your pages
- **Popular content**: Most viewed pages

**Limitations:**
- Only 14 days of data
- Limited detail compared to dedicated analytics

### 3. Simple Analytics (Privacy-Focused)

**Setup:**
```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

**Benefits:**
- GDPR compliant
- No cookies
- Lightweight
- Clean dashboard

### 4. Plausible Analytics (Privacy-Focused)

**Setup:**
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

**Benefits:**
- Open source
- No cookies
- Lightweight (< 1KB)
- GDPR compliant

### 5. Cloudflare Analytics (Free)

**Setup:**
1. Add your domain to Cloudflare (free plan available)
2. Update your DNS to use Cloudflare nameservers
3. Access analytics in Cloudflare dashboard

**Benefits:**
- Free tier available
- DDoS protection included
- CDN benefits
- Detailed traffic analytics

## 🛠️ Custom Analytics Implementation

### Basic Visitor Counter

Add this to your JavaScript for a simple visitor counter:

```javascript
// Simple visitor tracking (localStorage based)
function trackVisitor() {
    const visits = localStorage.getItem('siteVisits') || 0;
    const newVisits = parseInt(visits) + 1;
    localStorage.setItem('siteVisits', newVisits);
    
    // Send to your analytics endpoint
    fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            visits: newVisits,
            page: window.location.pathname,
            timestamp: new Date().toISOString()
        })
    }).catch(() => {}); // Fail silently
}

// Call on page load
document.addEventListener('DOMContentLoaded', trackVisitor);
```

### Contact Form Analytics

Track contact form submissions:

```javascript
// Add to your contact form handler
function trackFormSubmission(formType) {
    gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': formType,
        'value': 1
    });
}
```

## 📊 Monitoring Setup Recommendations

### For Personal Portfolio (Your Use Case):

1. **Primary**: Google Analytics 4
   - Free and comprehensive
   - Industry standard
   - Great for job applications (shows you understand web analytics)

2. **Secondary**: GitHub Insights
   - Already available
   - Good for quick checks
   - Shows repository engagement

3. **Optional**: Privacy-focused alternative (Plausible/Simple Analytics)
   - Shows you care about user privacy
   - Good for tech-savvy visitors

### Key Metrics to Track:

1. **Traffic Metrics:**
   - Unique visitors
   - Page views
   - Session duration
   - Bounce rate

2. **Engagement Metrics:**
   - Contact form submissions
   - Scroll depth
   - Time on page
   - Return visitors

3. **Technical Metrics:**
   - Page load speed
   - Mobile vs desktop usage
   - Browser/OS statistics
   - Geographic distribution

4. **Professional Metrics:**
   - CV download clicks (if you add one)
   - LinkedIn profile clicks
   - GitHub profile clicks
   - Contact form conversions

## 🔧 Implementation Priority:

1. **Week 1**: Set up Google Analytics
2. **Week 2**: Monitor GitHub Insights
3. **Week 3**: Add custom event tracking for important actions
4. **Week 4**: Set up alerts for unusual traffic patterns

## 📈 Advanced Monitoring:

### Performance Monitoring:
- **Google PageSpeed Insights**: Free performance analysis
- **GTmetrix**: Detailed performance reports
- **Lighthouse**: Built into Chrome DevTools

### Uptime Monitoring:
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Website availability monitoring
- **StatusCake**: Free tier available

### SEO Monitoring:
- **Google Search Console**: Free SEO insights
- **Bing Webmaster Tools**: Additional search engine data

## 🚀 Quick Start:

1. Uncomment Google Analytics code in your `index.html`
2. Create Google Analytics account
3. Replace `GA_MEASUREMENT_ID` with your actual ID
4. Deploy and wait 24-48 hours for data
5. Check GitHub repository insights weekly

## 📝 Privacy Considerations:

- Add privacy policy if using Google Analytics
- Consider cookie consent banner for EU visitors
- Use privacy-focused alternatives if preferred
- Be transparent about data collection

---

**Next Steps:**
1. Choose your analytics solution
2. Implement tracking code
3. Set up goals/events for important actions
4. Create monitoring dashboard
5. Review data weekly and optimize accordingly
