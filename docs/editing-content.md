# การแก้ไขเนื้อหา

เนื้อหาหลักอยู่ใน `src/content/`: `home.ts` สำหรับหน้าแรก, `story.ts` สำหรับเรื่องราว, `gallery.ts` สำหรับแกลเลอรี และ `works.ts` สำหรับผลงาน

## Page load preview ของผลงาน

เพิ่มหรือแก้ `preview` ในผลงานแต่ละรายการใน `src/content/works.ts` เพื่อแสดง preview โดยไม่ผูกกับ slug ของผลงาน ลบ `preview` ทั้งก้อนเมื่อต้องการซ่อนส่วนนี้

```ts
import dynamic from 'next/dynamic'

const BitkubBlockchainMockup = dynamic(
  () => import('@/components/work/BitkubBlockchain/WebsiteMockup')
)
```

กำหนด component ใน `preview` ของผลงาน:

```ts
preview: {
  component: BitkubBlockchainMockup,
  title: 'Page load preview',
  description: 'คำอธิบาย preview ของผลงาน',
  address: 'Website preview',
},
```

| ช่อง          | การใช้งาน                                                                                |
| ------------- | ---------------------------------------------------------------------------------------- |
| `component`   | React component ที่แสดงภายในกรอบ preview                                                 |
| `title`       | หัวข้อเหนือ preview                                                                      |
| `description` | คำอธิบายใต้ preview; ไม่ใส่ได้                                                           |
| `address`     | ข้อความในแถบ browser เป็นข้อความแสดงผล ไม่ได้โหลดเว็บไซต์; ค่าเริ่มต้น `Website preview` |

ข้อความที่ใช้ร่วมกันทุกผลงานแก้ที่ `src/content/work-preview.ts`:

```ts
export const WORK_PREVIEW_CONTENT = {
  scrollHint: 'Scroll inside the preview to explore the page.',
  viewportLabel: 'Scrollable website mockup',
}
```

`scrollHint` คือคำแนะนำพร้อมลูกศรใต้ preview และ `viewportLabel` คือชื่อพื้นที่เลื่อนสำหรับ screen reader ทั้งสองช่องเป็นค่ากลาง ไม่ต้องกำหนดซ้ำในผลงานแต่ละรายการ

`component` และ `title` เป็นช่องที่ต้องมีเมื่อเปิด preview หากต้องการแบบใหม่ ให้สร้าง component แล้วอ้างอิงใน `component` ได้โดยตรง ไม่ต้องลงทะเบียน template ใช้ `next/dynamic` สำหรับ component ที่มี animation หรือ dependency ขนาดใหญ่ เพื่อแยก bundle ออกจากหน้าแสดงรายการผลงาน

Component ไม่ต้องรับ props และจะแสดงอยู่ภายใน `BrowserPreviewFrame` ซึ่งจัดการปุ่ม pause/resume, replay และพื้นที่เลื่อนให้ หากมี animation ให้ใช้ `useBrowserPreviewFrame` จาก `@/components/molecules/BrowserPreviewFrame` เพื่ออ่าน `active` และ `viewportRef` เหมือน mockup เดิม
