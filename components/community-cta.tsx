
export default function CommunityCTA() {
  // Enlace directo al chat de WhatsApp con el número proporcionado
  const whatsappNumber = "1130085655";
  const whatsappLink = `https://wa.me/549${whatsappNumber}`;
  return (
    <section className="bg-[#f3e8ff] py-12 px-4 rounded-xl shadow-lg flex flex-col items-center text-center max-w-2xl mx-auto my-12">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#8e1dd1] mb-4">Únete a nuestra comunidad</h2>
      <p className="text-lg text-neutral-700 mb-6">
        Accede a recursos exclusivos, eventos y conecta con personas que comparten tu interés por el bienestar.<br />
        Si tienes dudas o quieres sumarte, también podés escribirnos directamente al WhatsApp <b>+54 9 11 3008-5655</b>.
      </p>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25d366] hover:bg-[#128c7e] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.463 3.484 1.341 4.997l-1.409 5.151 5.287-1.388c1.475.805 3.153 1.238 4.778 1.238h.001c5.522 0 9.997-4.475 9.997-9.997s-4.475-9.998-9.998-9.998zm5.8 15.797c-.822.822-1.781 1.466-2.847 1.899-.682.271-1.406.457-2.153.553-.516.067-1.045.102-1.573.102-1.475 0-2.921-.393-4.17-1.137l-.299-.176-3.142.825.833-3.073-.194-.312c-.713-1.146-1.09-2.471-1.09-3.84 0-4.411 3.589-8 8-8 2.137 0 4.146.833 5.656 2.344 1.511 1.511 2.344 3.52 2.344 5.656 0 2.137-.833 4.146-2.344 5.657zm-2.6-3.497c-.143-.072-.849-.418-.98-.466-.131-.048-.227-.072-.323.072-.096.143-.37.466-.453.561-.083.096-.167.108-.31.036-.143-.072-.604-.222-1.151-.708-.426-.38-.713-.849-.797-.992-.083-.143-.009-.221.063-.293.065-.064.143-.167.215-.25.072-.083.096-.143.143-.238.048-.096.024-.179-.012-.251-.036-.072-.323-.779-.443-1.067-.117-.281-.236-.242-.323-.247-.083-.005-.179-.006-.274-.006s-.251.036-.383.179c-.131.143-.515.504-.515 1.23 0 .726.527 1.428.601 1.527.072.096 1.036 1.584 2.513 2.16.352.152.627.242.841.31.353.112.674.096.927.058.283-.042.849-.346.969-.68.12-.335.12-.622.084-.68-.036-.059-.13-.095-.273-.167z"/></svg>
        Escribir por WhatsApp
      </a>
    </section>
  );
}
