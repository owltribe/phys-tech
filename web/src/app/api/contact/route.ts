import {google} from "googleapis";
import {GlobalOptions} from "googleapis-common";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
  const data = await request.json()
  const googleAuth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await googleAuth.getClient();
  const googleSheets = google.sheets({
    version: "v4",
    auth: client as GlobalOptions['auth'],
  });

  const {phone, fullName, email} = data

  const spreadsheetId = process.env.NEXT_PUBLIC_SPREAD_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error('NEXT_PUBLIC_SPREAD_SHEET_ID variable is required!')
  }

  const formattedForLinkPhone = phone.replace(/[^\d+]/g, '')

  await googleSheets.spreadsheets.values.append({
    // @ts-ignore
    auth: client,
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[fullName, email, formattedForLinkPhone]],
    },
  })

  return NextResponse.json({
    message: "Заявка успешно доставлена."
  })
}