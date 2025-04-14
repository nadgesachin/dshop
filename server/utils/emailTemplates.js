const getUserEmail = (user)=>{

    const userEmail = {
        from: process.env.MAIL_USER,
        to: 'nadgesachin644@gmail.com',
        subject: 'New User Registration - Shiv Mobile',
        html: `
          <div style="
            font-family: 'Segoe UI', sans-serif;
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #fff7ed, #fef3c7);
            padding: 30px 20px;
            border-radius: 15px;
          ">
            <div style="
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.06);
              padding: 32px;
            ">
              <!-- Logo and heading -->
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="https://i.ibb.co/yYc6FWc/logo.png" alt="Shiv Mobile Logo" style="width: 64px; height: 64px; border-radius: 50%; background: white; padding: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />
                <h1 style="margin-top: 12px; font-size: 24px; font-weight: 600; color: #ea580c;">New User Registration</h1>
                <p style="font-size: 14px; color: #6b7280;">Someone just signed up on Shiv Mobile Portal</p>
              </div>
    
              <div style="margin-top: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <strong style="min-width: 100px; color: #78350f;">Name:</strong>
                  <span style="color: #374151;">${user.name}</span>
                </div>
    
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <strong style="min-width: 100px; color: #78350f;">Email:</strong>
                  <span style="color: #374151;">${user.email}</span>
                </div>
    
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <strong style="min-width: 100px; color: #78350f;">DOB:</strong>
                  <span style="color: #374151;">${user.dob || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        `
    };

    return userEmail;
}

const getAdminEmail = (user)=>{
    const adminEmail = {
        from: process.env.MAIL_USER,
        to: user.email,
        subject: 'Welcome to Shiv Mobile!',
        html: `
          <div style="
            font-family: 'Segoe UI', sans-serif;
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #e0f2fe, #f0f9ff);
            padding: 30px 20px;
            border-radius: 15px;
          ">
            <div style="
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.06);
              padding: 32px;
            ">
              <!-- Logo and greeting -->
              <div style="text-align: center; margin-bottom: 24px;">
                <img src="https://i.ibb.co/yYc6FWc/logo.png" alt="Shiv Mobile Logo" style="width: 64px; height: 64px; border-radius: 50%; background: white; padding: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" />
                <h1 style="margin-top: 12px; font-size: 24px; font-weight: 600; color: #0284c7;">Welcome to Shiv Mobile</h1>
                <p style="font-size: 14px; color: #475569;">Hi ${user.name}, we're excited to have you on board!</p>
              </div>
      
              <!-- User Info Section -->
              <div style="margin-top: 20px;">
                <p style="color: #334155; font-size: 15px; margin-bottom: 20px;">
                  Thank you for registering on our portal. Below are your details:
                </p>
                
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <strong style="min-width: 100px; color: #0c4a6e;">Name:</strong>
                  <span style="color: #1e293b;">${user.name}</span>
                </div>
      
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <strong style="min-width: 100px; color: #0c4a6e;">Email:</strong>
                  <span style="color: #1e293b;">${user.email}</span>
                </div>
      
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <strong style="min-width: 100px; color: #0c4a6e;">DOB:</strong>
                  <span style="color: #1e293b;">${user.dob || 'N/A'}</span>
                </div>
      
                <p style="margin-top: 24px; font-size: 14px; color: #475569;">
                  If you have any questions, feel free to reply to this email. We’re here to help!
                </p>
              </div>
      
              <div style="margin-top: 30px; text-align: center;">
                <p style="font-size: 13px; color: #94a3b8;">Warm regards,</p>
                <p style="font-size: 14px; font-weight: 500; color: #0f172a;">The Shiv Mobile Team</p>
              </div>
            </div>
          </div>
        `
    };

    return adminEmail;
}

module.exports = { getUserEmail, getAdminEmail }; 