// formatted teks multiline
export const formattedText = (text) => {
  return text.replace(/\n/g, "<br />");
};

// formatted date
export const formattedDate = (data) => {
  const date = new Date(data);

  // Mendapatkan tanggal, bulan, tahun, jam, dan menit
  const day = date.getDate();
  const month = date.toLocaleString("id-ID", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format dengan dua digit untuk menit dan jam
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedHours = hours < 10 ? `0${hours}` : hours;

  // Menggabungkan bagian-bagian tanggal dan waktu
  return `${day} ${month} ${year}, ${formattedHours}:${formattedMinutes}`;
};

// text rules
export const textRules = (fieldName) => {
  return [(v) => !!v || `${fieldName} Harus Diisi`];
};
