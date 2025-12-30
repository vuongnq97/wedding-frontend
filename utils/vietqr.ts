export const VIET_QR_BANKS = [
  { name: 'Vietcombank', code: 'VCB', bin: '970436' },
  { name: 'Techcombank', code: 'TCB', bin: '970407' },
  { name: 'MBBank', code: 'MB', bin: '970422' },
  { name: 'ACB', code: 'ACB', bin: '970416' },
  { name: 'Agribank', code: 'VBA', bin: '970405' },
  { name: 'BIDV', code: 'BIDV', bin: '970418' },
  { name: 'Sacombank', code: 'STB', bin: '970403' },
  { name: 'TPBank', code: 'TPB', bin: '970423' },
  { name: 'VPBank', code: 'VPB', bin: '970432' },
  { name: 'VietinBank', code: 'ICB', bin: '970415' },
  { name: 'MSB', code: 'MSB', bin: '970426' },
  { name: 'VIB', code: 'VIB', bin: '970441' },
  { name: 'HDBank', code: 'HDB', bin: '970437' },
  { name: 'OCB', code: 'OCB', bin: '970448' },
  { name: 'SeABank', code: 'SEAB', bin: '970440' },
  { name: 'LienVietPostBank', code: 'LPB', bin: '970449' },
  { name: 'BacABank', code: 'BAB', bin: '970409' },
  { name: 'ShinhanBank', code: 'SHBVN', bin: '970424' },
  { name: 'Eximbank', code: 'EIB', bin: '970431' },
];

export const getVietQrUrl = (
  bankName: string,
  accountNumber: string,
  accountHolder?: string
) => {
  // Normalize bank name
  const normalizedName = bankName.toLowerCase().replace(/\s/g, '');

  // Find bank code
  const bank = VIET_QR_BANKS.find(
    (b) =>
      b.name.toLowerCase().replace(/\s/g, '') === normalizedName ||
      b.code.toLowerCase() === normalizedName ||
      b.bin === normalizedName
  );

  if (!bank) return null;

  // Use compact 2 template
  const url = `https://img.vietqr.io/image/${bank.code}-${accountNumber}-compact2.jpg`;

  // Add params
  const params = new URLSearchParams();
  if (accountHolder) params.set('accountName', accountHolder);
  params.set('amount', '0');
  params.set('addInfo', 'Wedding Gift');

  return `${url}?${params.toString()}`;
};
