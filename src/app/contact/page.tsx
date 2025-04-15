import ContactForm from "@/components/ContactForm";
import SocialLink from "@/components/SocialLink";

import { Facebook, Linkedin, Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="">
      <div className="container mx-auto py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 text-[#101828] dark:text-white ">Get in Touch</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Have a question or want to work together? Reach out through the form below or connect with us on social
              media.
            </p>
          </div>

          <div className="grid grid-cols-1 relative z-10 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3  bg-white dark:bg-[#162034] rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-800 dark:text-slate-100">
                  <MessageSquare className="mr-3 h-6 w-6 text-blue-900 dark:text-white" />
                  Send a message
                </h2>
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2 order-first flex flex-col gap-6">
              <div className="bg-white dark:bg-[#162034] rounded-2xl shadow-xl p-8 md:p-10">
                <h2 className="text-2xl capitalize font-semibold mb-6 text-slate-800 dark:text-slate-100">
                  Connect with Social Media
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <SocialLink
                    href="https://www.linkedin.com/in/md-nahid-mahmud/"
                    icon={<Linkedin className="h-5 w-5 text-[#0A66C2]" />}
                    name="LinkedIn"
                    username="@md-nahid-mahmud"
                  />

                  <SocialLink
                    href="https://www.facebook.com/nahidmahmudd/"
                    icon={<Facebook className="h-5 w-5 text-[#1877F2]" />}
                    name="Facebook"
                    username="@nahidmahmudd"
                  />

                  <SocialLink
                    href="https://wa.me/+8801777612585"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#25D366]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    }
                    name="WhatsApp"
                    username="+8801777612585"
                  />

                  <SocialLink
                    href="mailto:nahidmahmudn@gmail.com"
                    icon={<Mail className="h-5 w-5 text-[#EA4335]" />}
                    name="Email"
                    username="nahidmahmudn@gmail.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
