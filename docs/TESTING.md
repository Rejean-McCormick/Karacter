# Testing and limitations (Karacter 5.0)

Smoke tested in headless Chromium using a self-contained HTML harness:

- All eight polarity axes render and paired sliders remain complementary.
- Explorer shows four axes and Studio shows eight without deleting stored data.
- King Klown includes narrative fields.
- Relationships can be added and edited.
- French / English interface toggle works for the new sections.
- Generated prompts switch between portrait, expression sheet and action.
- Story stakes affect suggested reactions and action prompts.
- Changing a non-priority polarity still updates the compact prompt context.
- TXT character export includes new story/relationship sections.
- Complete ZIP contains a valid JSON backup and character sheets.
- Legacy King Klown TXT import was exercised successfully.

Browser-origin persistent storage and real uploaded portrait bytes have not been end-to-end tested in the user's local environment. Keep periodic Backup ZIP files.
