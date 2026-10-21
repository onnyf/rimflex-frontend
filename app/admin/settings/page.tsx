
"use client";

import { useState, type FormEvent } from "react";
import {
  FiBell,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiDollarSign,
  FiGlobe,
  FiLock,
  FiMail,
  FiMapPin,
  FiSave,
  FiSettings,
  FiShield,
  FiSmartphone,
  FiTruck,
  FiUser,
  FiX,
} from "react-icons/fi";

type SettingsSection =
  | "general"
  | "delivery"
  | "fees"
  | "orders"
  | "notifications"
  | "security";

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-7 w-14 shrink-0 rounded-full transition ${
        enabled ? "bg-[#003A2B]" : "bg-gray-300"
      }`}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-8" : "left-1"
        }`}
      />
    </button>
  );
}

function SectionButton({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-2xl p-4 text-left transition ${
        active
          ? "bg-[#003A2B] text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          active
            ? "bg-white/10 text-orange-300"
            : "bg-gray-100 text-[#003A2B]"
        }`}
      >
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-bold">{title}</span>

        <span
          className={`mt-1 block text-xs leading-5 ${
            active ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {description}
        </span>
      </span>
    </button>
  );
}

function AdminSettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [businessName, setBusinessName] = useState("Door-Step");
  const [supportEmail, setSupportEmail] = useState("support@doorstep.ng");
  const [supportPhone, setSupportPhone] = useState("+234 800 000 0000");
  const [businessAddress, setBusinessAddress] = useState(
    "Lagos, Nigeria"
  );
  const [currency, setCurrency] = useState("NGN");
  const [timezone, setTimezone] = useState("Africa/Lagos");

  const [deliveryFee, setDeliveryFee] = useState("1000");
  const [baseDeliveryDistance, setBaseDeliveryDistance] = useState("3");
  const [extraDistanceFee, setExtraDistanceFee] = useState("300");
  const [riderCommission, setRiderCommission] = useState("80");
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] =
    useState("15000");

  const [restaurantCommission, setRestaurantCommission] =
    useState("15");
  const [platformFee, setPlatformFee] = useState("100");
  const [serviceFeePercentage, setServiceFeePercentage] =
    useState("2");
  const [minimumServiceFee, setMinimumServiceFee] = useState("100");

  const [autoAssignRiders, setAutoAssignRiders] = useState(true);
  const [allowCashOnDelivery, setAllowCashOnDelivery] = useState(true);
  const [allowOrderCancellation, setAllowOrderCancellation] =
    useState(true);
  const [requireRestaurantConfirmation, setRequireRestaurantConfirmation] =
    useState(true);

  const [newOrderEmail, setNewOrderEmail] = useState(true);
  const [newOrderPush, setNewOrderPush] = useState(true);
  const [paymentEmail, setPaymentEmail] = useState(true);
  const [riderNotification, setRiderNotification] = useState(true);
  const [customerNotification, setCustomerNotification] =
    useState(true);

  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("60");

  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setSaved(false);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 700);
  }

  function renderGeneralSettings() {
    return (
      <div className="space-y-6">
        <PageSection
          icon={<FiSettings />}
          title="General Information"
          description="Manage the basic information displayed across the Door-Step platform."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Business Name"
              value={businessName}
              onChange={setBusinessName}
              placeholder="Door-Step"
            />

            <InputField
              label="Support Email"
              type="email"
              value={supportEmail}
              onChange={setSupportEmail}
              placeholder="support@doorstep.ng"
            />

            <InputField
              label="Support Phone"
              value={supportPhone}
              onChange={setSupportPhone}
              placeholder="+234 800 000 0000"
            />

            <InputField
              label="Business Address"
              value={businessAddress}
              onChange={setBusinessAddress}
              placeholder="Lagos, Nigeria"
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiGlobe />}
          title="Regional Settings"
          description="Configure currency, timezone and regional preferences."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SelectField
              label="Currency"
              value={currency}
              onChange={setCurrency}
              options={[
                { label: "Nigerian Naira (₦)", value: "NGN" },
                { label: "US Dollar ($)", value: "USD" },
                { label: "British Pound (£)", value: "GBP" },
              ]}
            />

            <SelectField
              label="Timezone"
              value={timezone}
              onChange={setTimezone}
              options={[
                {
                  label: "Africa/Lagos (WAT)",
                  value: "Africa/Lagos",
                },
                {
                  label: "Africa/Accra (GMT)",
                  value: "Africa/Accra",
                },
              ]}
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiMapPin />}
          title="Service Area"
          description="Control the main operating area for Door-Step."
        >
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#003A2B] shadow-sm">
                <FiMapPin />
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-900">
                  Lagos, Nigeria
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Door-Step is currently configured to operate within
                  Lagos. Additional cities can be enabled when the
                  platform expands.
                </p>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    );
  }

  function renderDeliverySettings() {
    return (
      <div className="space-y-6">
        <PageSection
          icon={<FiTruck />}
          title="Delivery Pricing"
          description="Configure the delivery charges customers pay."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <MoneyInput
              label="Base Delivery Fee"
              value={deliveryFee}
              onChange={setDeliveryFee}
            />

            <NumberInput
              label="Base Distance (KM)"
              value={baseDeliveryDistance}
              onChange={setBaseDeliveryDistance}
              suffix="km"
            />

            <MoneyInput
              label="Extra Distance Fee"
              value={extraDistanceFee}
              onChange={setExtraDistanceFee}
            />

            <NumberInput
              label="Rider Share"
              value={riderCommission}
              onChange={setRiderCommission}
              suffix="%"
            />

            <MoneyInput
              label="Free Delivery Threshold"
              value={freeDeliveryThreshold}
              onChange={setFreeDeliveryThreshold}
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiClock />}
          title="Delivery Operations"
          description="Configure how delivery jobs are assigned and managed."
        >
          <div className="divide-y divide-gray-100">
            <SettingRow
              title="Automatic Rider Assignment"
              description="Automatically assign available riders to new delivery orders."
              enabled={autoAssignRiders}
              onChange={() => setAutoAssignRiders(!autoAssignRiders)}
            />

            <SettingRow
              title="Allow Cash on Delivery"
              description="Allow customers to pay riders with cash when the order is delivered."
              enabled={allowCashOnDelivery}
              onChange={() =>
                setAllowCashOnDelivery(!allowCashOnDelivery)
              }
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiSmartphone />}
          title="Delivery Experience"
          description="Settings that affect the customer delivery experience."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              title="Standard Delivery"
              value="30–60 mins"
              description="Expected delivery window"
            />

            <InfoCard
              title="Maximum Radius"
              value="15 KM"
              description="Current delivery coverage"
            />
          </div>
        </PageSection>
      </div>
    );
  }

  function renderFeeSettings() {
    return (
      <div className="space-y-6">
        <PageSection
          icon={<FiDollarSign />}
          title="Platform Fees"
          description="Configure the fees and commissions used by Door-Step."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <NumberInput
              label="Restaurant Commission"
              value={restaurantCommission}
              onChange={setRestaurantCommission}
              suffix="%"
            />

            <MoneyInput
              label="Platform Fee"
              value={platformFee}
              onChange={setPlatformFee}
            />

            <NumberInput
              label="Service Fee"
              value={serviceFeePercentage}
              onChange={setServiceFeePercentage}
              suffix="%"
            />

            <MoneyInput
              label="Minimum Service Fee"
              value={minimumServiceFee}
              onChange={setMinimumServiceFee}
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiDollarSign />}
          title="Current Fee Summary"
          description="A quick overview of the current platform fee configuration."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              title="Restaurant"
              value={`${restaurantCommission}%`}
              description="Commission"
            />

            <InfoCard
              title="Platform"
              value={formatCurrency(Number(platformFee))}
              description="Per order"
            />

            <InfoCard
              title="Service"
              value={`${serviceFeePercentage}%`}
              description="Service fee"
            />

            <InfoCard
              title="Minimum"
              value={formatCurrency(Number(minimumServiceFee))}
              description="Minimum service fee"
            />
          </div>
        </PageSection>

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <p className="text-sm font-bold text-orange-800">
            Fee changes affect future orders.
          </p>

          <p className="mt-1 text-xs leading-5 text-orange-700">
            Existing orders should continue using the fees that were
            applied when the order was created.
          </p>
        </div>
      </div>
    );
  }

  function renderOrderSettings() {
    return (
      <div className="space-y-6">
        <PageSection
          icon={<FiCheck />}
          title="Order Management"
          description="Control how orders move through the Door-Step system."
        >
          <div className="divide-y divide-gray-100">
            <SettingRow
              title="Restaurant Confirmation Required"
              description="Restaurants must confirm new orders before preparation begins."
              enabled={requireRestaurantConfirmation}
              onChange={() =>
                setRequireRestaurantConfirmation(
                  !requireRestaurantConfirmation
                )
              }
            />

            <SettingRow
              title="Allow Order Cancellation"
              description="Allow customers to cancel eligible orders."
              enabled={allowOrderCancellation}
              onChange={() =>
                setAllowOrderCancellation(!allowOrderCancellation)
              }
            />

            <SettingRow
              title="Automatic Rider Assignment"
              description="Automatically assign available riders after an order is ready."
              enabled={autoAssignRiders}
              onChange={() => setAutoAssignRiders(!autoAssignRiders)}
            />

            <SettingRow
              title="Cash on Delivery"
              description="Allow customers to select cash payment for eligible orders."
              enabled={allowCashOnDelivery}
              onChange={() =>
                setAllowCashOnDelivery(!allowCashOnDelivery)
              }
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiClock />}
          title="Order Status Flow"
          description="The standard order lifecycle used by Door-Step."
        >
          <div className="space-y-3">
            {[
              "Pending",
              "Confirmed",
              "Preparing",
              "Ready for Pickup",
              "Out for Delivery",
              "Delivered",
            ].map((status, index) => (
              <div
                key={status}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003A2B] text-xs font-black text-white">
                  {index + 1}
                </div>

                <span className="text-sm font-bold text-gray-800">
                  {status}
                </span>

                {index < 5 && (
                  <span className="ml-auto text-xs text-gray-400">
                    Next
                  </span>
                )}
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    );
  }

  function renderNotificationSettings() {
    return (
      <div className="space-y-6">
        <PageSection
          icon={<FiBell />}
          title="Notification Preferences"
          description="Choose which operational notifications are enabled."
        >
          <div className="divide-y divide-gray-100">
            <SettingRow
              title="New Order Email"
              description="Send an email notification when a new order is received."
              enabled={newOrderEmail}
              onChange={() => setNewOrderEmail(!newOrderEmail)}
            />

            <SettingRow
              title="New Order Push Notification"
              description="Send push notifications for new orders."
              enabled={newOrderPush}
              onChange={() => setNewOrderPush(!newOrderPush)}
            />

            <SettingRow
              title="Payment Notifications"
              description="Notify administrators when payments are completed or fail."
              enabled={paymentEmail}
              onChange={() => setPaymentEmail(!paymentEmail)}
            />

            <SettingRow
              title="Rider Notifications"
              description="Send delivery assignment and operational notifications to riders."
              enabled={riderNotification}
              onChange={() =>
                setRiderNotification(!riderNotification)
              }
            />

            <SettingRow
              title="Customer Notifications"
              description="Send order updates and delivery notifications to customers."
              enabled={customerNotification}
              onChange={() =>
                setCustomerNotification(!customerNotification)
              }
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiMail />}
          title="Notification Channels"
          description="Available channels for Door-Step communications."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard
              title="Email"
              value="Enabled"
              description="Transactional email"
            />

            <InfoCard
              title="SMS"
              value="Ready"
              description="Customer alerts"
            />

            <InfoCard
              title="Push"
              value="Enabled"
              description="Mobile notifications"
            />
          </div>
        </PageSection>
      </div>
    );
  }

  function renderSecuritySettings() {
    return (
      <div className="space-y-6">
        <PageSection
          icon={<FiShield />}
          title="Administrator Security"
          description="Protect administrator accounts and platform access."
        >
          <div className="divide-y divide-gray-100">
            <SettingRow
              title="Two-Factor Authentication"
              description="Require administrators to verify their identity using a second authentication factor."
              enabled={twoFactorAuth}
              onChange={() => setTwoFactorAuth(!twoFactorAuth)}
            />

            <SettingRow
              title="Login Alerts"
              description="Notify administrators when a new login is detected."
              enabled={loginAlerts}
              onChange={() => setLoginAlerts(!loginAlerts)}
            />
          </div>
        </PageSection>

        <PageSection
          icon={<FiLock />}
          title="Session Security"
          description="Configure how long administrator sessions remain active."
        >
          <div className="max-w-md">
            <SelectField
              label="Session Timeout"
              value={sessionTimeout}
              onChange={setSessionTimeout}
              options={[
                { label: "15 minutes", value: "15" },
                { label: "30 minutes", value: "30" },
                { label: "60 minutes", value: "60" },
                { label: "120 minutes", value: "120" },
              ]}
            />
          </div>
        </PageSection>

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#003A2B] shadow-sm">
              <FiUser />
            </div>

            <div>
              <h3 className="text-sm font-black text-gray-900">
                Current Administrator
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                admin@doorstep.ng
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Administrator access
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderMaintenance() {
    return (
      <div className="space-y-6">
        <PageSection
          icon={<FiSettings />}
          title="Platform Maintenance"
          description="Control the availability of the Door-Step platform."
        >
          <div
            className={`rounded-2xl border p-5 ${
              maintenanceMode
                ? "border-red-200 bg-red-50"
                : "border-emerald-200 bg-emerald-50"
            }`}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    maintenanceMode
                      ? "bg-red-100 text-red-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {maintenanceMode ? <FiX /> : <FiCheck />}
                </div>

                <div>
                  <h3 className="text-sm font-black text-gray-900">
                    {maintenanceMode
                      ? "Maintenance Mode is ON"
                      : "Platform is Live"}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-600">
                    {maintenanceMode
                      ? "Customers may not be able to place new orders while maintenance mode is active."
                      : "Customers, restaurants and riders can access the platform normally."}
                  </p>
                </div>
              </div>

              <Toggle
                enabled={maintenanceMode}
                onChange={() =>
                  setMaintenanceMode(!maintenanceMode)
                }
              />
            </div>
          </div>
        </PageSection>

        <PageSection
          icon={<FiShield />}
          title="System Status"
          description="Current status of important Door-Step services."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Customer Platform",
              "Restaurant Platform",
              "Rider Platform",
              "Payment Services",
            ].map((service) => (
              <div
                key={service}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <span className="text-sm font-bold text-gray-700">
                  {service}
                </span>

                <span className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Operational
                </span>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#EEF2F1] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#003A2B] text-orange-300">
              <FiSettings className="text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
                Admin Settings
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Configure Door-Step platform settings and operational
                preferences.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* SIDEBAR */}
            <aside className="h-fit rounded-3xl border border-gray-200 bg-white p-3 shadow-sm lg:sticky lg:top-6">
              <div className="mb-3 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  Settings
                </p>
              </div>

              <div className="space-y-1">
                <SectionButton
                  active={activeSection === "general"}
                  icon={<FiSettings />}
                  title="General"
                  description="Business and regional settings"
                  onClick={() => setActiveSection("general")}
                />

                <SectionButton
                  active={activeSection === "delivery"}
                  icon={<FiTruck />}
                  title="Delivery"
                  description="Delivery pricing and operations"
                  onClick={() => setActiveSection("delivery")}
                />

                <SectionButton
                  active={activeSection === "fees"}
                  icon={<FiDollarSign />}
                  title="Fees & Commission"
                  description="Platform charges and commissions"
                  onClick={() => setActiveSection("fees")}
                />

                <SectionButton
                  active={activeSection === "orders"}
                  icon={<FiCheck />}
                  title="Orders"
                  description="Order flow and payment options"
                  onClick={() => setActiveSection("orders")}
                />

                <SectionButton
                  active={activeSection === "notifications"}
                  icon={<FiBell />}
                  title="Notifications"
                  description="Email, SMS and push alerts"
                  onClick={() => setActiveSection("notifications")}
                />

                <SectionButton
                  active={activeSection === "security"}
                  icon={<FiShield />}
                  title="Security"
                  description="Admin account and sessions"
                  onClick={() => setActiveSection("security")}
                />
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveSection("general")}
                  className="flex w-full items-center gap-3 rounded-2xl p-4 text-left text-gray-700 transition hover:bg-gray-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                    <FiGlobe />
                  </span>

                  <span>
                    <span className="block text-sm font-bold">
                      System
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                      Platform configuration
                    </span>
                  </span>
                </button>
              </div>
            </aside>

            {/* CONTENT */}
            <div className="min-w-0">
              {activeSection === "general" && renderGeneralSettings()}
              {activeSection === "delivery" && renderDeliverySettings()}
              {activeSection === "fees" && renderFeeSettings()}
              {activeSection === "orders" && renderOrderSettings()}
              {activeSection === "notifications" &&
                renderNotificationSettings()}
              {activeSection === "security" &&
                renderSecuritySettings()}

              {/* MAINTENANCE */}
              <div className="mt-6">
                {renderMaintenance()}
              </div>

              {/* SAVE BAR */}
              <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {saved
                      ? "Settings saved successfully."
                      : "Save your configuration"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Changes are currently stored in this demo session.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#003A2B] px-7 py-3 text-sm font-bold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saved ? <FiCheck /> : <FiSave />}

                  {saving
                    ? "Saving..."
                    : saved
                      ? "Saved"
                      : "Save Changes"}
                </button>
              </div>

              {/* DEMO NOTICE */}
              <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                <p className="text-sm leading-6 text-orange-800">
                  <strong>Demo mode:</strong> These settings are currently
                  managed in the frontend only. When the Door-Step backend
                  is connected, these values will be stored securely in the
                  database and applied across the customer, restaurant,
                  rider and admin platforms.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function PageSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-7 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-[#003A2B]">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-black text-gray-950">{title}</h2>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
      />
    </div>
  );
}

function MoneyInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
          ₦
        </span>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-8 pr-4 text-sm font-bold outline-none transition focus:border-[#003A2B] focus:bg-white"
        />
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm font-bold outline-none transition focus:border-[#003A2B] focus:bg-white"
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm font-medium outline-none transition focus:border-[#003A2B] focus:bg-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-2xl">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

function InfoCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
        {title}
      </p>

      <p className="mt-2 text-xl font-black text-gray-950">{value}</p>

      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

function formatCurrency(value: number) {
  return `₦${value.toLocaleString()}`;
}

export default AdminSettingsPage;
