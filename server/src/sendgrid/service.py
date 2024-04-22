from fastapi import HTTPException, status

import sendgrid
from config import SENDGRID_API_KEY
from sendgrid.helpers.mail import Mail


class SendgridService:
    def __init__(self):
        self.client = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)
        self.from_email = "from_email@example.com"

    def send_email_with_template(
        self, template_id: str, to_email: str, data: dict
    ):
        message = Mail(
            from_email=self.from_email,
            to_emails=[to_email],
        )
        message.template_id = template_id
        message.dynamic_template_data = data

        try:
            self.client.send(message)
        except Exception as e:
            print("SENDGRID occurred error:", e.message)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Не получилось отправить письмо с сервера. Попробуйте позже.",
            )

    def send_reset_password_email(self, to_email: str, token: str):
        self.send_email_with_template(
            template_id="TEMPLATE_ID",
            to_email=to_email,
            data={"email": to_email, "token": token},
        )
