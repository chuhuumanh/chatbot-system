const data = {
  messaging_product: "whatsapp",
  to: "84985127944",
  type: "interactive",
  interactive: {
    type: "list",
    header: {
      type: "text",
      text: "Select the appointment you would like.",
    },
    body: {
      text: "You will be presented with a list of options to choose from",
    },
    footer: {
      text: "All of them are freshly packed",
    },
    action: {
      button: "Book Appointment",
      sections: [
        {
          title: "Day 2024-06-20",
          rows: [
            {
              id: "15:00:00",
              title: "15:00:00",
            },
          ],
        },
        {
          title: "Day 2024-06-21",
          rows: [
            {
              id: "15:00:00",
              title: "15:00:00",
            },
          ],
        },
      ],
    },
  },
};

console.log(JSON.stringify(data));
