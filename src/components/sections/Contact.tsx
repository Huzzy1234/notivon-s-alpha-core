import { ArrowRight, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_NUMBER } from "@/lib/constants";
import { fadeUp, stagger, inView } from "@/lib/motion";

const Contact = () => (
  <section id="contact" className="py-24 sm:py-32 border-t border-border/60">
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1400px]">
      <motion.div
        variants={stagger()}
        {...inView}
        className="surface-1 border border-border rounded-lg p-8 sm:p-12 lg:p-16"
      >
        <div className="max-w-3xl">
          <motion.p variants={fadeUp} className="tech-label mb-6">
            Start here
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 leading-tight"
          >
            Not sure where AI fits your business?
            <br />
            <span className="text-primary">That's the exact question we answer.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Start with the free two-minute Scorecard, or go straight to the
            audit if you're ready for the full picture.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/scorecard"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
            >
              Take the free Scorecard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://calendly.com/hussainhussainakan/ai-discovery-meeting-clone"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border text-foreground font-semibold text-sm rounded-md hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book a call
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground border-t border-border pt-8"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              WhatsApp us
            </a>
            <span className="hidden sm:inline text-muted-foreground/40">·</span>
            <a
              href={`tel:${PHONE_PRIMARY}`}
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> {PHONE_PRIMARY}
            </a>
            <span className="hidden sm:inline text-muted-foreground/40">·</span>
            <a
              href={`tel:${PHONE_SECONDARY}`}
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> {PHONE_SECONDARY}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Contact;
