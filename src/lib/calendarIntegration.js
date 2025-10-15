// Calendar Integration Utilities for Google Calendar and Outlook
import toast from 'react-hot-toast';

// Generate ICS file content for calendar events
export const generateICSContent = (posts) => {
  const now = new Date();
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Social Media Content Planner//Content Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  posts.forEach((post, index) => {
    const postDate = new Date(post.date);
    // Set default time to 9:00 AM if not specified
    postDate.setHours(9, 0, 0, 0);
    
    const endDate = new Date(postDate);
    endDate.setHours(postDate.getHours() + 1); // 1 hour duration

    const uid = `content-post-${post.id}-${Date.now()}@socialmediaplanner.com`;
    
    // Create description with post details
    const description = [
      `Platform: ${post.platform.toUpperCase()}`,
      post.caption ? `Caption: ${post.caption.substring(0, 200)}${post.caption.length > 200 ? '...' : ''}` : '',
      post.hashtags ? `Hashtags: ${post.hashtags}` : '',
      post.visualNotes ? `Visual Notes: ${post.visualNotes}` : '',
      post.cta ? `Call to Action: ${post.cta}` : '',
      '',
      'Created with Social Media Content Planner'
    ].filter(line => line).join('\\n');

    icsContent.push(
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(postDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `DTSTAMP:${formatDate(now)}`,
      `UID:${uid}`,
      `SUMMARY:📱 ${post.platform.toUpperCase()}: ${post.title}`,
      `DESCRIPTION:${description}`,
      `STATUS:CONFIRMED`,
      `TRANSP:OPAQUE`,
      `CATEGORIES:Social Media,Content Planning`,
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');
  return icsContent.join('\r\n');
};

// Export to Google Calendar
export const exportToGoogleCalendar = (posts) => {
  try {
    if (posts.length === 0) {
      toast.error('No posts to export to calendar');
      return;
    }

    // For multiple events, we'll create an ICS file
    if (posts.length > 1) {
      downloadICSFile(posts, 'google');
      return;
    }

    // For single event, use Google Calendar URL
    const post = posts[0];
    const postDate = new Date(post.date);
    postDate.setHours(9, 0, 0, 0); // Default 9 AM

    const endDate = new Date(postDate);
    endDate.setHours(10, 0, 0, 0); // 1 hour duration

    const formatGoogleDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const title = encodeURIComponent(`📱 ${post.platform.toUpperCase()}: ${post.title}`);
    const description = encodeURIComponent([
      `Platform: ${post.platform.toUpperCase()}`,
      post.caption ? `Caption: ${post.caption}` : '',
      post.hashtags ? `Hashtags: ${post.hashtags}` : '',
      post.visualNotes ? `Visual Notes: ${post.visualNotes}` : '',
      post.cta ? `Call to Action: ${post.cta}` : '',
      '',
      'Created with Social Media Content Planner'
    ].filter(line => line).join('\n'));

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGoogleDate(postDate)}/${formatGoogleDate(endDate)}&details=${description}&ctz=America/New_York`;

    window.open(googleUrl, '_blank');
    toast.success('🗓️ Opening Google Calendar...');
  } catch (error) {
    console.error('Error exporting to Google Calendar:', error);
    toast.error('❌ Failed to export to Google Calendar');
  }
};

// Export to Outlook Calendar
export const exportToOutlookCalendar = (posts) => {
  try {
    if (posts.length === 0) {
      toast.error('No posts to export to calendar');
      return;
    }

    // For multiple events, create ICS file
    if (posts.length > 1) {
      downloadICSFile(posts, 'outlook');
      return;
    }

    // For single event, use Outlook URL
    const post = posts[0];
    const postDate = new Date(post.date);
    postDate.setHours(9, 0, 0, 0);

    const endDate = new Date(postDate);
    endDate.setHours(10, 0, 0, 0);

    const formatOutlookDate = (date) => {
      return date.toISOString();
    };

    const title = encodeURIComponent(`📱 ${post.platform.toUpperCase()}: ${post.title}`);
    const description = encodeURIComponent([
      `Platform: ${post.platform.toUpperCase()}`,
      post.caption ? `Caption: ${post.caption}` : '',
      post.hashtags ? `Hashtags: ${post.hashtags}` : '',
      post.visualNotes ? `Visual Notes: ${post.visualNotes}` : '',
      post.cta ? `Call to Action: ${post.cta}` : '',
      '',
      'Created with Social Media Content Planner'
    ].filter(line => line).join('\n'));

    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${formatOutlookDate(postDate)}&enddt=${formatOutlookDate(endDate)}&body=${description}`;

    window.open(outlookUrl, '_blank');
    toast.success('🗓️ Opening Outlook Calendar...');
  } catch (error) {
    console.error('Error exporting to Outlook:', error);
    toast.error('❌ Failed to export to Outlook');
  }
};

// Download ICS file for multiple events
export const downloadICSFile = (posts, calendarType = 'general') => {
  try {
    const icsContent = generateICSContent(posts);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-schedule-${new Date().toISOString().split('T')[0]}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const calendarName = calendarType === 'google' ? 'Google Calendar' : 
                        calendarType === 'outlook' ? 'Outlook' : 'your calendar';
    
    toast.success(`📅 Calendar file downloaded! Import it into ${calendarName}`);
  } catch (error) {
    console.error('Error downloading ICS file:', error);
    toast.error('❌ Failed to download calendar file');
  }
};

// Export specific date posts to calendar
export const exportDateToCalendar = (posts, date, calendarType) => {
  const datePosts = posts.filter(post => post.date === date);
  
  if (datePosts.length === 0) {
    toast.error('No posts found for this date');
    return;
  }

  switch (calendarType) {
    case 'google':
      exportToGoogleCalendar(datePosts);
      break;
    case 'outlook':
      exportToOutlookCalendar(datePosts);
      break;
    case 'ics':
      downloadICSFile(datePosts);
      break;
    default:
      toast.error('Unknown calendar type');
  }
};

// Export all posts to calendar
export const exportAllToCalendar = (posts, calendarType) => {
  if (posts.length === 0) {
    toast.error('No posts to export');
    return;
  }

  switch (calendarType) {
    case 'google':
      if (posts.length === 1) {
        exportToGoogleCalendar(posts);
      } else {
        downloadICSFile(posts, 'google');
      }
      break;
    case 'outlook':
      if (posts.length === 1) {
        exportToOutlookCalendar(posts);
      } else {
        downloadICSFile(posts, 'outlook');
      }
      break;
    case 'ics':
      downloadICSFile(posts);
      break;
    default:
      toast.error('Unknown calendar type');
  }
};

// Check if browser supports calendar integration
export const isCalendarSupported = () => {
  return typeof window !== 'undefined' && window.open;
};

// Get calendar integration instructions
export const getCalendarInstructions = (calendarType) => {
  const instructions = {
    google: {
      title: 'Google Calendar Export',
      steps: [
        'Single posts open directly in Google Calendar',
        'Multiple posts download as .ics file',
        'Import .ics file: Google Calendar → Settings → Import & Export → Import',
        'Your content schedule will appear as calendar events'
      ]
    },
    outlook: {
      title: 'Outlook Calendar Export',
      steps: [
        'Single posts open directly in Outlook Calendar',
        'Multiple posts download as .ics file',
        'Import .ics file: Outlook → File → Open & Export → Import/Export',
        'Your content schedule will appear as calendar events'
      ]
    },
    ics: {
      title: 'Universal Calendar File',
      steps: [
        'Downloads .ics file compatible with all calendar apps',
        'Import into Apple Calendar, Google Calendar, Outlook, etc.',
        'Each post becomes a calendar event with full details',
        'Set reminders to never miss posting schedules'
      ]
    }
  };

  return instructions[calendarType] || instructions.ics;
};