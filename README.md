## Backend NodeJS (With Vanilla Javascript) Internship (Remote)

There's an opening for 3 intern Backend NodeJS developers. The internship duration is 3 months (Flexible work hours).
After the 3 months, at least 2 developers will be selected for a full time offer.

** What we are looking for **

We don't care much about CVs and long stories about your educational background. The things we do GREATLY care about are:

1. Your soft skills. (Responsible communication and responsiveness)
2. You know when to admit you don't know a lot or anything about something
3. You are quite good at googling stuff and figuring \*\*\*\* out
4. Your word is your bond. When you say something will be ready by 11AM, then the thing is ready by 11AM. Not a microsecond after.
5. You at the very least, know the difference between var, let and const.
6. Be able to parse requirements, confident enough to ask questions about any and everything not understood.

** What are we offering for the internship **
Net pay (monthly): NGN 80,0000 (Eighty thousand naira only)
Internet allowance (monthly): NGN 20,0000 (Twenty thousand naira only)
Health Insurance

** What we need you to do **
Create a single express API endpoint route [HTTP POST] that accepts the following payload
{
"csv":{
"url": "https://linktocsv",
"select_fields": ["First Name", "Last Name", "Age"],
}
}

Your endpoint should (among other things):

1. Ensure the URL contains a valid CSV
2. Convert the CSV to a JSON array
3. The JSON array should only contain the fields specified in the "select_fields" parameter.
   An example: If the CSV has 2 items, and the following fields, "First Name, Last Name, Age, DOB, Mobile, Email, MatricNumber"
   Based on the example payload shared above, the returned JSON array should have this structure:

```json
[
  {
    "First Name": "Ade",
    "Last Name": "Stark",
    "Age": 21
  },
  {
    "First Name": "Ade",
    "Last Name": "Stark",
    "Age": 21
  }
]
```

(PS: If the select_fields parameter is not passed, your service should return all fields) 4. Once you have parsed the results, generate a random identifier and return an API response that looks like the below:

```json
{
  "conversion_key": "ZEMAHBb54vkFXPHA9jHY6Xp3gMnMAKYg",
  "json": [
    {
      "First Name": "Ade",
      "Last Name": "Stark",
      "Age": 21
    },
    {
      "First Name": "Ade",
      "Last Name": "Stark",
      "Age": 21
    }
  ]
}
```

The 4 items listed above are the basic requirements. Feel free to extend or add any extra thing that comes to mind.
Your implementation should be done on Glitch (https://glitch.com) and in a single server.js file (You can use the default Glitch Express scaffold).
Make the glitch public so we can edit and see your code.
Once done, please send your implementation (just the glitch link) to jesse.tmmg@gmail.com using the subject (Nodejs Backend Intern)
The deadline for submissions is 04:00PM - Friday, January 8, 2021.
