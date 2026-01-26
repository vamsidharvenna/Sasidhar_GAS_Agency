import React, { useState } from 'react';
import { quickActions } from '../../constants/data';
import { useChat } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';
import { Section } from '../ui/Section';
import { Modal } from '../ui/Modal';
import { FormField } from '../ui/FormField';
import { Button } from '../ui/Button';

type FormType = 'new' | 'complaint' | 'delivery' | null;

export const QuickActions: React.FC = () => {
  const { t } = useLanguage();
  const { openChat } = useChat();

  // Existing Telegram/web-alerts service (DO NOT change this)
  const WEB_ALERTS_API_BASE = import.meta.env.VITE_WEB_ALERTS_API_BASE_URL ?? '';

  // Separate delivery-status service
  const DELIVERY_API_BASE = import.meta.env.VITE_DELIVERY_STATUS_API_BASE_URL ?? '';

  const [activeForm, setActiveForm] = useState<FormType>(null);

  // new + complaint states
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [newConn, setNewConn] = useState({ name: '', phone: '', location: '' });
  const [complaint, setComplaint] = useState({ name: '', phone: '', location: '', issue: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // delivery states
  const [area, setArea] = useState('');
  const [areaError, setAreaError] = useState<string | null>(null);
  const [areaMessage, setAreaMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [areaLoading, setAreaLoading] = useState(false);

  // confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState<string | null>(null);

  const resetState = () => {
    setNewConn({ name: '', phone: '', location: '' });
    setComplaint({ name: '', phone: '', location: '', issue: '' });
    setErrors({});
    setSubmitMessage(null);

    setArea('');
    setAreaError(null);
    setAreaMessage(null);
    setAreaLoading(false);
  };

  const closeModal = () => {
    setActiveForm(null);
    resetState();
  };

  const handleTileClick = (item: typeof quickActions[0]) => {
    if (item.href) {
      const element = document.querySelector(item.href);
      element?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (item.topic === 'new_connection') {
      setActiveForm('new');
      return;
    }

    if (item.topic === 'complaint') {
      setActiveForm('complaint');
      return;
    }

    if (item.topic === 'delivery') {
      setActiveForm('delivery');
      return;
    }

    if (item.topic) openChat();
  };

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const validateForm = (type: Exclude<FormType, 'delivery' | null>) => {
    const form = type === 'complaint' ? complaint : newConn;
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.phone.trim()) newErrors.phone = 'Please enter your phone number.';
    else if (!validatePhone(form.phone)) newErrors.phone = 'Phone number should have at least 10 digits.';
    if (!form.location.trim()) newErrors.location = 'Please enter your location.';

    if (type === 'complaint' && !(form as typeof complaint).issue.trim()) {
      newErrors.issue = 'Please describe your issue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // NEW + COMPLAINT (existing telegram service) — unchanged behavior except confirmation UI
  const submitForm = async (type: Exclude<FormType, 'delivery' | null>) => {
    const isValid = validateForm(type);
    if (!isValid) return;

    if (!WEB_ALERTS_API_BASE) {
      setSubmitMessage('Configuration error: VITE_WEB_ALERTS_API_BASE_URL is not set.');
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    const isComplaint = type === 'complaint';
    const endpoint = `${WEB_ALERTS_API_BASE}/api/web/${isComplaint ? 'complaint' : 'new-connection'}`;
    const payload = isComplaint ? complaint : newConn;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with status ${res.status}`);
      }

      // success: close form and show confirmation
      closeModal();
      const message =
        type === 'complaint'
          ? '✅Thanks for informing us. We received your complaint and will respond shortly.'
          : '✅ Thanks! We received your request. Our team will call you shortly.';
      setConfirmMessage(message);
      setShowConfirm(true);
    } catch (err: any) {
      setSubmitMessage(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm = (type: 'new' | 'complaint') => {
    const form = type === 'complaint' ? complaint : newConn;

    const updateField = (field: string, value: string) => {
      if (type === 'complaint') {
        setComplaint((prev) => ({ ...prev, [field]: value } as typeof complaint));
      } else {
        setNewConn((prev) => ({ ...prev, [field]: value } as typeof newConn));
      }
    };

    return (
      <div className="space-y-4">
        <FormField
          label="Name"
          name={`${type}-name`}
          value={form.name}
          onChange={(v) => updateField('name', v)}
          placeholder="Please enter your name"
          required
          error={errors.name}
        />

        <FormField
          label="Phone"
          name={`${type}-phone`}
          type="tel"
          value={form.phone}
          onChange={(v) => updateField('phone', v)}
          placeholder="Please enter your phone number"
          required
          error={errors.phone}
        />

        <FormField
          label="Location"
          name={`${type}-location`}
          value={form.location}
          onChange={(v) => updateField('location', v)}
          placeholder="Please enter your location"
          required
          error={errors.location}
        />

        {type === 'complaint' && (
          <FormField
            label="Issue"
            name="issue"
            type="textarea"
            value={complaint.issue}
            onChange={(v) => updateField('issue', v)}
            placeholder="Please describe your issue"
            required
            error={errors.issue}
          />
        )}

        {submitMessage && (
          <p
            className={`text-sm ${
              submitMessage.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {submitMessage}
          </p>
        )}
      </div>
    );
  };

  // DELIVERY STATUS (separate Cloud Run)
  const submitDeliveryStatus = async () => {
    const trimmed = area.trim();
    if (!trimmed) {
      setAreaError('Please enter your area / location.');
      return;
    }
    setAreaError(null);

    if (!DELIVERY_API_BASE) {
      setAreaMessage({
        type: 'error',
        text: 'Configuration error: VITE_DELIVERY_STATUS_API_BASE_URL is not set.',
      });
      return;
    }

    setAreaLoading(true);
    setAreaMessage(null);

    try {
      const res = await fetch(`${DELIVERY_API_BASE}/api/web/delivery-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area: trimmed }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        const errText = data?.error || `Request failed with status ${res.status}`;
        setAreaMessage({ type: 'error', text: errText });
        return;
      }

      setAreaMessage({ type: 'success', text: data.message || 'Delivery info not available.' });
    } catch (err: any) {
      setAreaMessage({ type: 'error', text: err?.message || 'Something went wrong. Please try again.' });
    } finally {
      setAreaLoading(false);
    }
  };

  return (
    <Section className="py-[70px] pb-[60px]">
      <h2 className="text-center text-3xl text-[#004A99] mb-5 font-bold">
        {t('quick_actions_title')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickActions.map((item) => (
          <div
            key={item.labelKey}
            onClick={() => handleTileClick(item)}
            className="bg-white p-5 rounded-[10px] text-center shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-transform duration-200 cursor-pointer border border-[#eee] hover:-translate-y-[3px] hover:border-[#004A99]"
          >
            <span className="text-[2rem] mb-2.5 block">{item.icon}</span>
            <h3 className="text-base text-[#004A99] font-semibold mb-2">{t(item.labelKey)}</h3>
          </div>
        ))}
      </div>

      {/* NEW */}
      <Modal
        open={activeForm === 'new'}
        onClose={closeModal}
        title="New LPG Connection"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} className="min-w-[90px]">
              Cancel
            </Button>
            <Button onClick={() => submitForm('new')} disabled={submitting} className="min-w-[110px]">
              {submitting ? 'Sending…' : 'Send'}
            </Button>
          </>
        }
      >
        {renderForm('new')}
      </Modal>

      {/* COMPLAINT */}
      <Modal
        open={activeForm === 'complaint'}
        onClose={closeModal}
        title="Complaint / Issue"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} className="min-w-[90px]">
              Cancel
            </Button>
            <Button onClick={() => submitForm('complaint')} disabled={submitting} className="min-w-[110px]">
              {submitting ? 'Sending…' : 'Send'}
            </Button>
          </>
        }
      >
        {renderForm('complaint')}
      </Modal>

      {/* DELIVERY STATUS */}
      <Modal
        open={activeForm === 'delivery'}
        onClose={closeModal}
        title="Delivery Status"
        footer={
          <>
            <Button variant="outline" onClick={closeModal} className="min-w-[90px]">
              Cancel
            </Button>
            <Button onClick={submitDeliveryStatus} disabled={areaLoading} className="min-w-[120px]">
              {areaLoading ? 'Checking…' : 'Check Status'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Area / Location"
            name="delivery-area"
            value={area}
            onChange={(v) => setArea(v)}
            placeholder="Please enter your area / location"
            required
            error={areaError || undefined}
          />

          {areaMessage && (
            <pre
              className={`text-sm whitespace-pre-wrap rounded-lg border px-3 py-2 ${
                areaMessage.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}
            >
              {areaMessage.text}
            </pre>
          )}
        </div>
      </Modal>

      {/* Confirmation */}
      <Modal
        open={showConfirm}
        onClose={() => {
          setShowConfirm(false);
          setConfirmMessage(null);
        }}
        title="Confirmation"
        footer={
          <Button
            variant="outline"
            onClick={() => {
              setShowConfirm(false);
              setConfirmMessage(null);
            }}
            className="min-w-[90px]"
          >
            Cancel
          </Button>
        }
      >
        <p className="text-sm text-[#0f172a] whitespace-pre-line">{confirmMessage}</p>
      </Modal>
    </Section>
  );
};
