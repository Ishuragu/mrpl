const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    let receiverEmail = "admin@mettalicgroup.com";

    switch (data.productType) {
      case "Sheets":
        receiverEmail = "roofing@mettalicgroup.com";
        break;

      case "Shed/Industrial Work":
        receiverEmail = "engineering@mettalicgroup.com";
        break;

      default:
        receiverEmail = "admin@mettalicgroup.com";
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT == "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.verify();
    console.log("SMTP connection verified");

    const mailOptions = {
      from: `"Mettalic Group Website" <${process.env.SMTP_USER}>`,
      to: receiverEmail,
      replyTo: data.email,
      subject: `New Enquiry - ${data.productType}`,
      text: `
Name: ${data.name}

Company: ${data.company}

Phone: ${data.phone}

Email: ${data.email}

City: ${data.city}

Product Type: ${data.productType}

Message:
${data.message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: err.message,
      }),
    };
  }
};
