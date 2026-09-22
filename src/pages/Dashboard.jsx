import { useEffect, useState } from "react";
import {
  getOrders,
  getInventory,
  getDashboard,
} from "../services/api";
import FormModal from "../components/FormModal";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  /* =========================
     INVENTORY
  ========================= */

  const [inventory, setInventory] = useState([
    {
      id: 1,
      medicineName: "Paracetamol 500mg",
      category: "General Medicine",
      quantity: 50,
      reorderLevel: 20,
    },
    {
      id: 2,
      medicineName: "Amoxicillin 250mg",
      category: "Antibiotic",
      quantity: 35,
      reorderLevel: 15,
    },
    {
      id: 3,
      medicineName: "Vitamin D3",
      category: "Vitamins",
      quantity: 20,
      reorderLevel: 10,
    },
    {
      id: 4,
      medicineName: "Cetirizine 10mg",
      category: "Allergy",
      quantity: 18,
      reorderLevel: 20,
    },
    {
      id: 5,
      medicineName: "Omeprazole 20mg",
      category: "Gastro",
      quantity: 12,
      reorderLevel: 20,
    },
  ]);

  /* =========================
     ORDERS
  ========================= */

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "ORD1025",
      medicineName: "Paracetamol 500mg",
      quantity: 3,
      source: "Hospital A",
      status: "COMPLETED",
    },
    {
      id: 2,
      orderId: "ORD1024",
      medicineName: "Amoxicillin 250mg",
      quantity: 1,
      source: "Clinic B",
      status: "PENDING",
    },
    {
      id: 3,
      orderId: "ORD1023",
      medicineName: "Vitamin D3",
      quantity: 5,
      source: "Hospital C",
      status: "COMPLETED",
    },
    {
      id: 4,
      orderId: "ORD1022",
      medicineName: "Cetirizine 10mg",
      quantity: 2,
      source: "Pharmacy A",
      status: "COMPLETED",
    },
    {
      id: 5,
      orderId: "ORD1021",
      medicineName: "Omeprazole 20mg",
      quantity: 4,
      source: "Pharmacy B",
      status: "CANCELLED",
    },
  ]);

  /* =========================
     CUSTOMERS
  ========================= */

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "9876543210",
      email: "rajesh@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "9876543211",
      email: "priya@gmail.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Arun Medical Center",
      phone: "9876543212",
      email: "arunmedical@gmail.com",
      status: "Active",
    },
    {
      id: 4,
      name: "Lakshmi Clinic",
      phone: "9876543213",
      email: "lakshmiclinic@gmail.com",
      status: "Active",
    },
    {
      id: 5,
      name: "City Health Care",
      phone: "9876543214",
      email: "cityhealth@gmail.com",
      status: "Inactive",
    },
  ]);

  /* =========================
     SUPPLIERS
  ========================= */

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "MedPlus Distributors",
      contact: "9840012345",
      medicines: 25,
      deliveries: 18,
      status: "Active",
    },
    {
      id: 2,
      name: "Apollo Wholesale",
      contact: "9840012346",
      medicines: 32,
      deliveries: 25,
      status: "Active",
    },
    {
      id: 3,
      name: "Sri Medical Supplies",
      contact: "9840012347",
      medicines: 18,
      deliveries: 12,
      status: "Active",
    },
    {
      id: 4,
      name: "HealthCare Distributors",
      contact: "9840012348",
      medicines: 21,
      deliveries: 15,
      status: "Active",
    },
  ]);

  /* =========================
     PRESCRIPTIONS
  ========================= */

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      prescriptionId: "RX1001",
      patient: "Rahul Kumar",
      doctor: "Dr. Anand",
      medicines: 3,
      date: "18 Sep 2026",
      status: "Approved",
    },
    {
      id: 2,
      prescriptionId: "RX1002",
      patient: "Priya Devi",
      doctor: "Dr. Meena",
      medicines: 2,
      date: "19 Sep 2026",
      status: "Pending",
    },
    {
      id: 3,
      prescriptionId: "RX1003",
      patient: "Karthik Raj",
      doctor: "Dr. Kumar",
      medicines: 4,
      date: "20 Sep 2026",
      status: "Approved",
    },
  ]);

  /* =========================
     SALES
  ========================= */

  const [sales] = useState([
    {
      id: 1,
      orderId: "ORD1025",
      customer: "Hospital A",
      amount: "₹2,450",
      date: "20 Sep 2026",
      status: "Completed",
    },
    {
      id: 2,
      orderId: "ORD1024",
      customer: "Clinic B",
      amount: "₹1,250",
      date: "20 Sep 2026",
      status: "Pending",
    },
    {
      id: 3,
      orderId: "ORD1023",
      customer: "Hospital C",
      amount: "₹3,150",
      date: "19 Sep 2026",
      status: "Completed",
    },
    {
      id: 4,
      orderId: "ORD1022",
      customer: "Pharmacy A",
      amount: "₹850",
      date: "19 Sep 2026",
      status: "Completed",
    },
  ]);

  /* =========================
     MODAL
  ========================= */

  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const [backendOnline, setBackendOnline] = useState(false);
  const [searchText, setSearchText] = useState("");
const [showSearchResults, setShowSearchResults] = useState(false);

  /* =========================
     NOTIFICATIONS
  ========================= */

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: "📦",
      title: "Low stock alert",
      message:
        "Cetirizine 10mg is below reorder level.",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      icon: "🛒",
      title: "Order completed",
      message:
        "Order ORD1025 has been completed successfully.",
      time: "15 min ago",
      unread: true,
    },
    {
      id: 3,
      icon: "💊",
      title: "Inventory updated",
      message:
        "Paracetamol 500mg stock was updated.",
      time: "30 min ago",
      unread: false,
    },
  ]);

  /* =========================
     STATS
  ========================= */

  const [stats, setStats] = useState({
    totalOrders: 1248,
    processing: 24,
    completed: 1180,
    failed: 44,
  });

  /* =========================
     LOAD BACKEND DATA
  ========================= */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        ordersResponse,
        inventoryResponse,
        dashboardResponse,
      ] = await Promise.all([
        getOrders(),
        getInventory(),
        getDashboard(),
      ]);

      if (ordersResponse?.data) {
        setOrders(ordersResponse.data);
      }

      if (inventoryResponse?.data) {
        setInventory(inventoryResponse.data);
      }

      if (dashboardResponse?.data) {
        setStats((previous) => ({
          ...previous,
          ...dashboardResponse.data,
        }));
      }

      setBackendOnline(true);
    } catch (error) {
      console.log(
        "Backend unavailable. Running frontend demo mode."
      );

      setBackendOnline(false);
    }
  };

  /* =========================
     CALCULATIONS
  ========================= */

  const totalMedicines = inventory.length;

  const totalStock = inventory.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const lowStockCount = inventory.filter(
    (item) =>
      Number(item.quantity || 0) > 0 &&
      Number(item.quantity || 0) <=
        Number(item.reorderLevel || 10)
  ).length;

  const outOfStockCount = inventory.filter(
    (item) =>
      Number(item.quantity || 0) === 0
  ).length;

  /* =========================
     NOTIFICATION FUNCTIONS
  ========================= */

  const toggleNotifications = () => {
    setShowNotifications(
      (previous) => !previous
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const unreadNotificationCount =
    notifications.filter(
      (notification) => notification.unread
    ).length;

  /* =========================
     MODAL
  ========================= */

  const openModal = (type) => {
    setModalType(type);
    setFormData({});
  };

  const closeModal = () => {
    setModalType(null);
    setFormData({});
  };

  /* =========================
     FORM CONFIGURATION
  ========================= */

  const getFields = () => {
    if (modalType === "medicine") {
      return [
        {
          name: "medicineName",
          label: "Medicine Name",
          type: "text",
          placeholder:
            "Example: Azithromycin 500mg",
        },
        {
          name: "category",
          label: "Category",
          type: "text",
          placeholder: "Example: Antibiotic",
        },
        {
          name: "quantity",
          label: "Initial Stock",
          type: "number",
          placeholder:
            "Enter stock quantity",
        },
        {
          name: "reorderLevel",
          label: "Reorder Level",
          type: "number",
          placeholder: "Example: 10",
        },
      ];
    }

    if (modalType === "addStock") {
      return [
        {
          name: "medicineName",
          label: "Medicine",
          type: "select",
          options: inventory.map(
            (item) => item.medicineName
          ),
        },
        {
          name: "quantity",
          label: "Quantity to Add",
          type: "number",
          placeholder: "Enter quantity",
        },
      ];
    }

    if (modalType === "removeStock") {
      return [
        {
          name: "medicineName",
          label: "Medicine",
          type: "select",
          options: inventory.map(
            (item) => item.medicineName
          ),
        },
        {
          name: "quantity",
          label: "Quantity to Remove",
          type: "number",
          placeholder: "Enter quantity",
        },
      ];
    }

    if (modalType === "order") {
      return [
        {
          name: "medicineName",
          label: "Medicine",
          type: "select",
          options: inventory.map(
            (item) => item.medicineName
          ),
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
          placeholder: "Enter quantity",
        },
        {
          name: "source",
          label: "Customer / Hospital",
          type: "text",
          placeholder:
            "Example: Apollo Hospital",
        },
      ];
    }

    if (modalType === "customer") {
      return [
        {
          name: "name",
          label: "Customer Name",
          type: "text",
          placeholder:
            "Enter customer name",
        },
        {
          name: "phone",
          label: "Phone Number",
          type: "tel",
          placeholder:
            "Enter phone number",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
      ];
    }

    if (modalType === "supplier") {
      return [
        {
          name: "name",
          label: "Supplier Name",
          type: "text",
          placeholder:
            "Enter supplier name",
        },
        {
          name: "contact",
          label: "Contact Number",
          type: "tel",
          placeholder:
            "Enter contact number",
        },
        {
          name: "medicines",
          label: "Number of Medicines",
          type: "number",
          placeholder:
            "Enter number",
        },
      ];
    }

    if (modalType === "prescription") {
      return [
        {
          name: "patient",
          label: "Patient Name",
          type: "text",
          placeholder:
            "Enter patient name",
        },
        {
          name: "doctor",
          label: "Doctor Name",
          type: "text",
          placeholder:
            "Enter doctor name",
        },
        {
          name: "medicines",
          label: "Number of Medicines",
          type: "number",
          placeholder:
            "Enter number",
        },
      ];
    }

    return [];
  };

  const getModalTitle = () => {
    const titles = {
      medicine: "Add New Medicine",
      addStock: "Add Stock",
      removeStock: "Remove Stock",
      order: "Create New Order",
      customer: "Add New Customer",
      supplier: "Add New Supplier",
      prescription: "Add Prescription",
    };

    return titles[modalType] || "";
  };

  /* =========================
     FORM SUBMIT
  ========================= */

  const handleFormSubmit = (event) => {
    event.preventDefault();

    /* =========================
       ADD MEDICINE
    ========================= */

    if (modalType === "medicine") {
      const newMedicine = {
        id: Date.now(),
        medicineName:
          formData.medicineName,
        category: formData.category,
        quantity: Number(
          formData.quantity
        ),
        reorderLevel: Number(
          formData.reorderLevel
        ),
      };

      setInventory((previous) => [
        ...previous,
        newMedicine,
      ]);

      setNotifications((previous) => [
        {
          id: Date.now(),
          icon: "💊",
          title: "Medicine added",
          message: `${formData.medicineName} was added to inventory.`,
          time: "Just now",
          unread: true,
        },
        ...previous,
      ]);

      alert(
        "Medicine added successfully!"
      );

      closeModal();
      return;
    }

    /* =========================
       ADD STOCK
    ========================= */

    if (modalType === "addStock") {
      const quantity = Number(
        formData.quantity
      );

      if (quantity <= 0) {
        alert(
          "Enter a valid quantity."
        );
        return;
      }

      setInventory((previous) =>
        previous.map((item) =>
          item.medicineName ===
          formData.medicineName
            ? {
                ...item,
                quantity:
                  Number(
                    item.quantity || 0
                  ) + quantity,
              }
            : item
        )
      );

      setNotifications((previous) => [
        {
          id: Date.now(),
          icon: "📦",
          title: "Inventory updated",
          message: `${quantity} units added to ${formData.medicineName}.`,
          time: "Just now",
          unread: true,
        },
        ...previous,
      ]);

      alert(
        "Stock added successfully!"
      );

      closeModal();
      return;
    }

    /* =========================
       REMOVE STOCK
    ========================= */

    if (modalType === "removeStock") {
      const quantity = Number(
        formData.quantity
      );

      const medicine = inventory.find(
        (item) =>
          item.medicineName ===
          formData.medicineName
      );

      if (!medicine) {
        alert("Medicine not found.");
        return;
      }

      if (quantity <= 0) {
        alert(
          "Enter a valid quantity."
        );
        return;
      }

      if (
        quantity >
        Number(medicine.quantity)
      ) {
        alert(
          `Only ${medicine.quantity} units are available.`
        );
        return;
      }

      setInventory((previous) =>
        previous.map((item) =>
          item.medicineName ===
          formData.medicineName
            ? {
                ...item,
                quantity:
                  Number(item.quantity) -
                  quantity,
              }
            : item
        )
      );

      setNotifications((previous) => [
        {
          id: Date.now(),
          icon: "📦",
          title: "Inventory updated",
          message: `${quantity} units removed from ${formData.medicineName}.`,
          time: "Just now",
          unread: true,
        },
        ...previous,
      ]);

      alert(
        "Stock removed successfully!"
      );

      closeModal();
      return;
    }

    /* =========================
       CREATE ORDER
       DIRECTLY COMPLETED
    ========================= */

    if (modalType === "order") {
      const quantity = Number(
        formData.quantity
      );

      const medicine = inventory.find(
        (item) =>
          item.medicineName ===
          formData.medicineName
      );

      if (!medicine) {
        alert("Medicine not found.");
        return;
      }

      if (quantity <= 0) {
        alert(
          "Enter a valid quantity."
        );
        return;
      }

      const orderId =
        "ORD" +
        Date.now()
          .toString()
          .slice(-5);

      /* OUT OF STOCK */

      if (
        quantity >
        Number(medicine.quantity)
      ) {
        const failedOrder = {
          id: Date.now(),
          orderId,
          medicineName:
            formData.medicineName,
          quantity,
          source: formData.source,
          status: "OUT_OF_STOCK",
        };

        setOrders((previous) => [
          failedOrder,
          ...previous,
        ]);

        setStats((previous) => ({
          ...previous,
          totalOrders:
            previous.totalOrders + 1,
          failed:
            previous.failed + 1,
        }));

        setNotifications((previous) => [
          {
            id: Date.now(),
            icon: "⚠️",
            title: "Order failed",
            message: `${orderId} is out of stock for ${formData.medicineName}.`,
            time: "Just now",
            unread: true,
          },
          ...previous,
        ]);

        alert(
          "Order created but marked OUT OF STOCK."
        );

        closeModal();
        return;
      }

      /* REDUCE INVENTORY */

      setInventory((previous) =>
        previous.map((item) =>
          item.medicineName ===
          formData.medicineName
            ? {
                ...item,
                quantity:
                  Number(item.quantity) -
                  quantity,
              }
            : item
        )
      );

      /* IMPORTANT:
         NEW ORDER IS DIRECTLY COMPLETED
      */

      const newOrder = {
        id: Date.now(),
        orderId,
        medicineName:
          formData.medicineName,
        quantity,
        source: formData.source,
        status: "COMPLETED",
      };

      setOrders((previous) => [
        newOrder,
        ...previous,
      ]);

      /* UPDATE STATS */

      setStats((previous) => ({
        ...previous,
        totalOrders:
          previous.totalOrders + 1,
        completed:
          previous.completed + 1,
      }));

      /* ADD NOTIFICATION */

      setNotifications((previous) => [
        {
          id: Date.now(),
          icon: "🛒",
          title: "Order completed",
          message: `${orderId} for ${formData.medicineName} has been completed successfully.`,
          time: "Just now",
          unread: true,
        },
        ...previous,
      ]);

      alert(
        "Order completed successfully!"
      );

      closeModal();
      return;
    }

    /* =========================
       ADD CUSTOMER
    ========================= */

    if (modalType === "customer") {
      const newCustomer = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        status: "Active",
      };

      setCustomers((previous) => [
        ...previous,
        newCustomer,
      ]);

      alert(
        "Customer added successfully!"
      );

      closeModal();
      return;
    }

    /* =========================
       ADD SUPPLIER
    ========================= */

    if (modalType === "supplier") {
      const newSupplier = {
        id: Date.now(),
        name: formData.name,
        contact: formData.contact,
        medicines: Number(
          formData.medicines
        ),
        deliveries: 0,
        status: "Active",
      };

      setSuppliers((previous) => [
        ...previous,
        newSupplier,
      ]);

      alert(
        "Supplier added successfully!"
      );

      closeModal();
      return;
    }

    /* =========================
       ADD PRESCRIPTION
    ========================= */

    if (modalType === "prescription") {
      const newPrescription = {
        id: Date.now(),
        prescriptionId:
          "RX" +
          Date.now()
            .toString()
            .slice(-4),
        patient: formData.patient,
        doctor: formData.doctor,
        medicines: Number(
          formData.medicines
        ),
        date: new Date().toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
        status: "Pending",
      };

      setPrescriptions((previous) => [
        ...previous,
        newPrescription,
      ]);

      alert(
        "Prescription added successfully!"
      );

      closeModal();
    }
  };
  /* =========================
   GLOBAL SEARCH
========================= */

const getSearchResults = () => {
  const query = searchText.trim().toLowerCase();

  if (!query) {
    return [];
  }

  const results = [];

  // Application pages
  const pages = [
    {
      name: "Dashboard",
      page: "dashboard",
      description: "Pharmacy dashboard and overview",
      action: "Open Dashboard",
      icon: "📊",
    },
    {
      name: "Orders",
      page: "orders",
      description: "Manage and monitor pharmacy orders",
      action: "Open Orders",
      icon: "📦",
    },
    {
      name: "Medicines",
      page: "medicines",
      description: "Manage all medicines",
      action: "Open Medicines",
      icon: "💊",
    },
    {
      name: "Inventory",
      page: "inventory",
      description: "Manage pharmacy stock",
      action: "Open Inventory",
      icon: "🏥",
    },
    {
      name: "Customers",
      page: "customers",
      description: "Manage pharmacy customers",
      action: "Open Customers",
      icon: "👥",
    },
    {
      name: "Suppliers",
      page: "suppliers",
      description: "Manage medicine suppliers",
      action: "Open Suppliers",
      icon: "🚚",
    },
    {
      name: "Sales & Reports",
      page: "sales",
      description: "View pharmacy sales and reports",
      action: "Open Sales",
      icon: "📈",
    },
    {
      name: "Prescriptions",
      page: "prescriptions",
      description: "Manage customer prescriptions",
      action: "Open Prescriptions",
      icon: "📋",
    },
    {
      name: "Settings",
      page: "settings",
      description: "Manage pharmacy settings",
      action: "Open Settings",
      icon: "⚙️",
    },
  ];

  pages.forEach((page) => {
    const text = `
      ${page.name}
      ${page.description}
      ${page.action}
    `.toLowerCase();

    if (text.includes(query)) {
      results.push({
        type: "page",
        title: page.name,
        description: page.description,
        action: page.action,
        page: page.page,
        icon: page.icon,
      });
    }
  });

  // Medicines / Inventory
  inventory.forEach((medicine) => {
    const text = `
      ${medicine.medicineName}
      ${medicine.category}
      ${medicine.quantity}
      ${medicine.reorderLevel}
    `.toLowerCase();

    if (text.includes(query)) {
      results.push({
        type: "medicine",
        title: medicine.medicineName,
        description: `${medicine.category} • Stock: ${medicine.quantity}`,
        action: "Open Medicine / Manage Stock",
        page: "medicines",
        icon: "💊",
      });

      results.push({
        type: "inventory",
        title: `${medicine.medicineName} Inventory`,
        description: `Current stock: ${medicine.quantity} • Reorder level: ${medicine.reorderLevel}`,
        action: "Manage Inventory",
        page: "inventory",
        icon: "🏥",
      });
    }
  });

  // Orders
  orders.forEach((order) => {
    const text = `
      ${order.orderId}
      ${order.medicineName}
      ${order.source}
      ${order.status}
      ${order.quantity}
    `.toLowerCase();

    if (text.includes(query)) {
      results.push({
        type: "order",
        title: order.orderId,
        description: `${order.medicineName} • Qty: ${order.quantity} • ${order.status}`,
        action: "Open Order",
        page: "orders",
        icon: "📦",
      });
    }
  });

  // Customers
  customers.forEach((customer) => {
    const text = `
      ${customer.name}
      ${customer.phone}
      ${customer.email}
    `.toLowerCase();

    if (text.includes(query)) {
      results.push({
        type: "customer",
        title: customer.name,
        description: `${customer.phone} • ${customer.email}`,
        action: "Open Customer",
        page: "customers",
        icon: "👤",
      });
    }
  });

  // Suppliers
  suppliers.forEach((supplier) => {
    const text = `
      ${supplier.name}
      ${supplier.contact}
      ${supplier.medicine}
    `.toLowerCase();

    if (text.includes(query)) {
      results.push({
        type: "supplier",
        title: supplier.name,
        description: `${supplier.medicine} • ${supplier.contact}`,
        action: "Open Supplier",
        page: "suppliers",
        icon: "🚚",
      });
    }
  });

  // Prescriptions
  prescriptions.forEach((prescription) => {
    const text = `
      ${prescription.prescriptionId}
      ${prescription.patient}
      ${prescription.doctor}
      ${prescription.medicine}
      ${prescription.status}
    `.toLowerCase();

    if (text.includes(query)) {
      results.push({
        type: "prescription",
        title: prescription.prescriptionId,
        description: `${prescription.patient} • ${prescription.medicine}`,
        action: "Open Prescription",
        page: "prescriptions",
        icon: "📋",
      });
    }
  });

  // Sales
  sales.forEach((sale) => {
    const text = `
      ${sale.orderId}
      ${sale.customer}
      ${sale.amount}
      ${sale.status}
      ${sale.date}
    `.toLowerCase();

    if (text.includes(query)) {
      results.push({
        type: "sale",
        title: sale.orderId,
        description: `${sale.customer} • ₹${sale.amount} • ${sale.status}`,
        action: "Open Sales & Reports",
        page: "sales",
        icon: "💰",
      });
    }
  });

  return results.slice(0, 12);
};

const searchResults = getSearchResults();

const handleSearchChange = (event) => {
  const value = event.target.value;

  setSearchText(value);
  setShowSearchResults(true);
};

const handleSearchResultClick = (result) => {
  setActivePage(result.page);
  setSearchText("");
  setShowSearchResults(false);
};

const clearSearch = () => {
  setSearchText("");
  setShowSearchResults(false);
};

  /* =========================
     SIDEBAR
  ========================= */

  const menuItems = [
    {
      id: "dashboard",
      icon: "🏠",
      label: "Dashboard",
    },
    {
      id: "orders",
      icon: "🛒",
      label: "Orders",
    },
    {
      id: "medicines",
      icon: "💊",
      label: "Medicines",
    },
    {
      id: "inventory",
      icon: "📦",
      label: "Inventory",
    },
    {
      id: "customers",
      icon: "👥",
      label: "Customers",
    },
    {
      id: "suppliers",
      icon: "🚚",
      label: "Suppliers",
    },
    {
      id: "sales",
      icon: "📊",
      label: "Sales & Reports",
    },
    {
      id: "prescriptions",
      icon: "📋",
      label: "Prescriptions",
    },
    {
      id: "settings",
      icon: "⚙️",
      label: "Settings",
    },
  ];

  /* =========================
     STATUS BADGE
  ========================= */

  const StatusBadge = ({ status }) => {
    const className = String(status || "")
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("_", "-");

    return (
      <span
        className={`status-pill ${className}`}
      >
        {String(status || "").replaceAll(
          "_",
          " "
        )}
      </span>
    );
  };

  /* =========================
     PAGE HEADING
  ========================= */

  const PageHeading = ({
    title,
    description,
    button,
    secondButton,
    onClick,
    onSecondClick,
  }) => (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="heading-actions">
        {secondButton && (
          <button
            className="secondary-action-btn"
            onClick={onSecondClick}
          >
            {secondButton}
          </button>
        )}

        {button && (
          <button
            className="primary-btn"
            onClick={onClick}
          >
            + {button}
          </button>
        )}
      </div>
    </div>
  );

  /* =========================
     TABLE CARD
  ========================= */

  const TableCard = ({
    title,
    description,
    children,
  }) => (
    <div className="details-card">
      <div className="details-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="details-table-wrapper">
        {children}
      </div>
    </div>
  );

  /* =========================
     DASHBOARD
  ========================= */

  const renderDashboard = () => (
    <>
      <div className="dashboard-top">
        <div>
          <h1>Pharmacy Dashboard</h1>
          <p>
            Monitor pharmacy operations,
            inventory and orders
          </p>
        </div>

        <div className="connection-status">
          <span
            className={
              backendOnline
                ? "online-dot"
                : "demo-dot"
            }
          ></span>

          {backendOnline
            ? "Backend Connected"
            : "Demo Mode"}
        </div>
      </div>

      <div className="welcome-card">
        <div>
          <span className="welcome-small">
            Welcome back
          </span>

          <h1>Pharmacy Operations</h1>

          <p>
            Manage orders, medicines,
            inventory and prescriptions
            from one place.
          </p>
        </div>

        <div className="welcome-icon">
          💊
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-icon">
            🛒
          </div>

          <div>
            <span>Total Orders</span>
            <strong>
              {stats.totalOrders}
            </strong>
            <small>All orders</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            ⏳
          </div>

          <div>
            <span>Processing</span>
            <strong>
              {stats.processing}
            </strong>
            <small>
              Currently processing
            </small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <strong>
              {stats.completed}
            </strong>
            <small>
              Successfully completed
            </small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">
            ⚠️
          </div>

          <div>
            <span>Failed</span>
            <strong>
              {stats.failed}
            </strong>
            <small>
              Failed orders
            </small>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-title">
            <div>
              <h2>Order Overview</h2>
              <p>
                Current order processing
                status
              </p>
            </div>
          </div>

          <div className="order-overview">
            <div className="donut">
              <div className="donut-inner">
                <strong>
                  {stats.totalOrders}
                </strong>

                <span>Orders</span>
              </div>
            </div>

            <div className="legend">
              <div>
                <span className="legend-dot completed"></span>
                Completed
                <strong>
                  {stats.completed}
                </strong>
              </div>

              <div>
                <span className="legend-dot processing"></span>
                Processing
                <strong>
                  {stats.processing}
                </strong>
              </div>

              <div>
                <span className="legend-dot failed"></span>
                Failed
                <strong>
                  {stats.failed}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <div className="card-title">
            <div>
              <h2>Inventory Summary</h2>
              <p>
                Current pharmacy stock
              </p>
            </div>
          </div>

          <div className="inventory-overview">
            <div>
              <span>Total Medicines</span>
              <strong>
                {totalMedicines}
              </strong>
            </div>

            <div>
              <span>Total Stock Units</span>
              <strong>
                {totalStock}
              </strong>
            </div>

            <div>
              <span>Low Stock</span>
              <strong>
                {lowStockCount}
              </strong>
            </div>

            <div>
              <span>Out of Stock</span>
              <strong>
                {outOfStockCount}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <TableCard
        title="Recent Orders"
        description="Latest pharmacy orders"
      >
        <table className="details-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders
              .slice(0, 5)
              .map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>
                      #{order.orderId}
                    </strong>
                  </td>

                  <td>
                    {order.medicineName}
                  </td>

                  <td>
                    {order.quantity}
                  </td>

                  <td>
                    {order.source}
                  </td>

                  <td>
                    <StatusBadge
                      status={order.status}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableCard>
    </>
  );

  /* =========================
     ORDERS PAGE
  ========================= */

  const renderOrders = () => (
    <>
      <PageHeading
        title="Orders"
        description="Manage and monitor pharmacy orders"
        button="New Order"
        onClick={() =>
          openModal("order")
        }
      />

      <div className="summary-grid">
        <div>
          <span>Total Orders</span>
          <strong>
            {orders.length}
          </strong>
        </div>

        <div>
          <span>Processing</span>
          <strong>
            {orders.filter(
              (x) =>
                x.status ===
                  "PROCESSING" ||
                x.status === "PENDING"
            ).length}
          </strong>
        </div>

        <div>
          <span>Completed</span>
          <strong>
            {orders.filter(
              (x) =>
                x.status ===
                "COMPLETED"
            ).length}
          </strong>
        </div>

        <div>
          <span>
            Failed / Out of Stock
          </span>

          <strong>
            {orders.filter(
              (x) =>
                x.status ===
                  "FAILED" ||
                x.status ===
                  "OUT_OF_STOCK"
            ).length}
          </strong>
        </div>
      </div>

      <TableCard
        title="All Orders"
        description="Live order processing status"
      >
        <table className="details-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Medicine</th>
              <th>Quantity</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>
                    #{order.orderId}
                  </strong>
                </td>

                <td>
                  {order.medicineName}
                </td>

                <td>
                  {order.quantity}
                </td>

                <td>
                  {order.source}
                </td>

                <td>
                  <StatusBadge
                    status={order.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableCard>
    </>
  );

  /* =========================
     MEDICINES
  ========================= */

  const renderMedicines = () => (
    <>
      <PageHeading
        title="Medicines"
        description="Manage all medicines in the pharmacy"
        button="Add Medicine"
        onClick={() =>
          openModal("medicine")
        }
      />

      <div className="summary-grid">
        <div>
          <span>Total Medicines</span>
          <strong>
            {totalMedicines}
          </strong>
        </div>

        <div>
          <span>Total Stock</span>
          <strong>
            {totalStock}
          </strong>
        </div>

        <div>
          <span>Low Stock</span>
          <strong>
            {lowStockCount}
          </strong>
        </div>

        <div>
          <span>Out of Stock</span>
          <strong>
            {outOfStockCount}
          </strong>
        </div>
      </div>

      <TableCard
        title="Medicine List"
        description="Available medicines in the pharmacy"
      >
        <table className="details-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Category</th>
              <th>Available Stock</th>
              <th>Reorder Level</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map(
              (medicine) => {
                const quantity =
                  Number(
                    medicine.quantity
                  ) || 0;

                const reorderLevel =
                  Number(
                    medicine.reorderLevel
                  ) || 10;

                let status =
                  "Available";

                if (
                  quantity === 0
                ) {
                  status =
                    "Out of Stock";
                } else if (
                  quantity <=
                  reorderLevel
                ) {
                  status =
                    "Low Stock";
                }

                return (
                  <tr
                    key={
                      medicine.id
                    }
                  >
                    <td>
                      <div className="medicine-name">
                        <span className="medicine-icon">
                          💊
                        </span>

                        <strong>
                          {
                            medicine.medicineName
                          }
                        </strong>
                      </div>
                    </td>

                    <td>
                      {medicine.category ||
                        "General Medicine"}
                    </td>

                    <td>
                      <strong>
                        {quantity}
                      </strong>
                    </td>

                    <td>
                      {reorderLevel}
                    </td>

                    <td>
                      <StatusBadge
                        status={
                          status
                        }
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </TableCard>
    </>
  );

  /* =========================
     INVENTORY
  ========================= */

  const renderInventory = () => (
    <>
      <PageHeading
        title="Inventory"
        description="Manage pharmacy stock levels"
        button="Add Stock"
        secondButton="− Remove Stock"
        onClick={() =>
          openModal("addStock")
        }
        onSecondClick={() =>
          openModal("removeStock")
        }
      />

      <div className="summary-grid">
        <div>
          <span>Total Stock Units</span>
          <strong>
            {totalStock}
          </strong>
        </div>

        <div>
          <span>Medicines</span>
          <strong>
            {totalMedicines}
          </strong>
        </div>

        <div>
          <span>Low Stock</span>
          <strong>
            {lowStockCount}
          </strong>
        </div>

        <div>
          <span>Out of Stock</span>
          <strong>
            {outOfStockCount}
          </strong>
        </div>
      </div>

      <TableCard
        title="Current Inventory"
        description="Real-time medicine availability"
      >
        <table className="details-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Category</th>
              <th>Available</th>
              <th>Reorder Level</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map(
              (item) => {
                const quantity =
                  Number(
                    item.quantity
                  ) || 0;

                const reorder =
                  Number(
                    item.reorderLevel
                  ) || 10;

                let status =
                  "AVAILABLE";

                if (
                  quantity === 0
                ) {
                  status =
                    "OUT_OF_STOCK";
                } else if (
                  quantity <=
                  reorder
                ) {
                  status =
                    "LOW_STOCK";
                }

                return (
                  <tr
                    key={item.id}
                  >
                    <td>
                      <strong>
                        {
                          item.medicineName
                        }
                      </strong>
                    </td>

                    <td>
                      {item.category ||
                        "General Medicine"}
                    </td>

                    <td>
                      <strong>
                        {quantity}
                      </strong>
                    </td>

                    <td>
                      {reorder}
                    </td>

                    <td>
                      <StatusBadge
                        status={
                          status
                        }
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </TableCard>
    </>
  );

  /* =========================
     CUSTOMERS
  ========================= */

  const renderCustomers = () => (
    <>
      <PageHeading
        title="Customers"
        description="Manage pharmacy customers"
        button="Add Customer"
        onClick={() =>
          openModal("customer")
        }
      />

      <div className="summary-grid">
        <div>
          <span>Total Customers</span>
          <strong>
            {customers.length}
          </strong>
        </div>

        <div>
          <span>Active Customers</span>
          <strong>
            {
              customers.filter(
                (x) =>
                  x.status ===
                  "Active"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Inactive</span>
          <strong>
            {
              customers.filter(
                (x) =>
                  x.status ===
                  "Inactive"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>New This Month</span>
          <strong>12</strong>
        </div>
      </div>

      <TableCard
        title="Customer List"
        description="Registered pharmacy customers"
      >
        <table className="details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {customers.map(
              (customer) => (
                <tr
                  key={
                    customer.id
                  }
                >
                  <td>
                    <strong>
                      {
                        customer.name
                      }
                    </strong>
                  </td>

                  <td>
                    {customer.phone}
                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    <StatusBadge
                      status={
                        customer.status
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </TableCard>
    </>
  );

  /* =========================
     SUPPLIERS
  ========================= */

  const renderSuppliers = () => (
    <>
      <PageHeading
        title="Suppliers"
        description="Manage medicine suppliers"
        button="Add Supplier"
        onClick={() =>
          openModal("supplier")
        }
      />

      <div className="summary-grid">
        <div>
          <span>Total Suppliers</span>
          <strong>
            {suppliers.length}
          </strong>
        </div>

        <div>
          <span>Active Suppliers</span>
          <strong>
            {
              suppliers.filter(
                (x) =>
                  x.status ===
                  "Active"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Total Medicines</span>
          <strong>
            {suppliers.reduce(
              (total, x) =>
                total +
                Number(
                  x.medicines
                ),
              0
            )}
          </strong>
        </div>

        <div>
          <span>Deliveries</span>
          <strong>
            {suppliers.reduce(
              (total, x) =>
                total +
                Number(
                  x.deliveries
                ),
              0
            )}
          </strong>
        </div>
      </div>

      <TableCard
        title="Supplier List"
        description="Medicine suppliers and distributors"
      >
        <table className="details-table">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Contact</th>
              <th>Medicines</th>
              <th>Deliveries</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map(
              (supplier) => (
                <tr
                  key={
                    supplier.id
                  }
                >
                  <td>
                    <strong>
                      {
                        supplier.name
                      }
                    </strong>
                  </td>

                  <td>
                    {
                      supplier.contact
                    }
                  </td>

                  <td>
                    {
                      supplier.medicines
                    }
                  </td>

                  <td>
                    {
                      supplier.deliveries
                    }
                  </td>

                  <td>
                    <StatusBadge
                      status={
                        supplier.status
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </TableCard>
    </>
  );

  /* =========================
     SALES
  ========================= */

  const renderSales = () => (
    <>
      <PageHeading
        title="Sales & Reports"
        description="Monitor pharmacy sales and transactions"
      />

      <div className="summary-grid">
        <div>
          <span>Total Sales</span>
          <strong>
            ₹7,700
          </strong>
        </div>

        <div>
          <span>Today's Sales</span>
          <strong>
            ₹3,700
          </strong>
        </div>

        <div>
          <span>
            Completed Orders
          </span>

          <strong>
            {
              orders.filter(
                (x) =>
                  x.status ===
                  "COMPLETED"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Average Order</span>
          <strong>
            ₹1,925
          </strong>
        </div>
      </div>

      <TableCard
        title="Sales Transactions"
        description="Recent completed sales"
      >
        <table className="details-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sales.map(
              (sale) => (
                <tr
                  key={
                    sale.id
                  }
                >
                  <td>
                    <strong>
                      #{sale.orderId}
                    </strong>
                  </td>

                  <td>
                    {sale.customer}
                  </td>

                  <td>
                    <strong>
                      {sale.amount}
                    </strong>
                  </td>

                  <td>
                    {sale.date}
                  </td>

                  <td>
                    <StatusBadge
                      status={
                        sale.status
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </TableCard>
    </>
  );

  /* =========================
     PRESCRIPTIONS
  ========================= */

  const renderPrescriptions =
    () => (
      <>
        <PageHeading
          title="Prescriptions"
          description="Manage customer prescriptions"
          button="Add Prescription"
          onClick={() =>
            openModal(
              "prescription"
            )
          }
        />

        <div className="summary-grid">
          <div>
            <span>
              Total Prescriptions
            </span>

            <strong>
              {
                prescriptions.length
              }
            </strong>
          </div>

          <div>
            <span>Approved</span>

            <strong>
              {
                prescriptions.filter(
                  (x) =>
                    x.status ===
                    "Approved"
                ).length
              }
            </strong>
          </div>

          <div>
            <span>Pending</span>

            <strong>
              {
                prescriptions.filter(
                  (x) =>
                    x.status ===
                    "Pending"
                ).length
              }
            </strong>
          </div>

          <div>
            <span>
              Today's Prescriptions
            </span>

            <strong>3</strong>
          </div>
        </div>

        <TableCard
          title="Prescription List"
          description="Recent prescriptions"
        >
          <table className="details-table">
            <thead>
              <tr>
                <th>
                  Prescription ID
                </th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Medicines</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {prescriptions.map(
                (prescription) => (
                  <tr
                    key={
                      prescription.id
                    }
                  >
                    <td>
                      <strong>
                        #
                        {
                          prescription.prescriptionId
                        }
                      </strong>
                    </td>

                    <td>
                      {
                        prescription.patient
                      }
                    </td>

                    <td>
                      {
                        prescription.doctor
                      }
                    </td>

                    <td>
                      {
                        prescription.medicines
                      }
                    </td>

                    <td>
                      {
                        prescription.date
                      }
                    </td>

                    <td>
                      <StatusBadge
                        status={
                          prescription.status
                        }
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </TableCard>
      </>
    );

  /* =========================
     SETTINGS
  ========================= */

  const renderSettings = () => (
    <>
      <PageHeading
        title="Settings"
        description="Manage pharmacy dashboard settings"
      />

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-icon">
            🏪
          </div>

          <div>
            <h3>
              Pharmacy Information
            </h3>

            <p>
              Configure pharmacy name,
              address, contact information
              and operating details.
            </p>

            <button
              onClick={() =>
                alert(
                  "Pharmacy information settings opened."
                )
              }
            >
              Configure
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            🔔
          </div>

          <div>
            <h3>
              Notifications
            </h3>

            <p>
              Configure low-stock,
              order and system notifications.
            </p>

            <button
              onClick={() => {
                setShowNotifications(
                  true
                );
                setActivePage(
                  "dashboard"
                );
              }}
            >
              Configure
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            🔐
          </div>

          <div>
            <h3>Security</h3>

            <p>
              Manage access control and
              account security settings.
            </p>

            <button
              onClick={() =>
                alert(
                  "Security settings opened."
                )
              }
            >
              Configure
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-icon">
            ⚙️
          </div>

          <div>
            <h3>
              System Settings
            </h3>

            <p>
              Configure system preferences
              and dashboard behavior.
            </p>

            <button
              onClick={() =>
                alert(
                  "System settings opened."
                )
              }
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </>
  );

  /* =========================
     MAIN PAGE
  ========================= */

  const renderPage = () => {
    switch (activePage) {
      case "orders":
        return renderOrders();

      case "medicines":
        return renderMedicines();

      case "inventory":
        return renderInventory();

      case "customers":
        return renderCustomers();

      case "suppliers":
        return renderSuppliers();

      case "sales":
        return renderSales();

      case "prescriptions":
        return renderPrescriptions();

      case "settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };

  /* =========================
     RETURN
  ========================= */

  return (
    <div className="app-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="logo-box">
            💊
          </div>

          <div>
            <h2>PharmaCare</h2>

            <span>
              Management System
            </span>
          </div>

        </div>

        <nav className="sidebar-nav">

          <div className="nav-label">
            MAIN MENU
          </div>

          {menuItems.map(
            (item) => (
              <button
                key={item.id}
                className={
                  activePage ===
                  item.id
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  setActivePage(
                    item.id
                  )
                }
              >
                <span className="nav-icon">
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>
              </button>
            )
          )}

        </nav>

        <div className="sidebar-bottom">

          <div className="system-status">

            <span className="system-dot"></span>

            <div>
              <strong>
                System Online
              </strong>

              <small>
                All services operational
              </small>
            </div>

          </div>

        </div>

      </aside>

      {/* =========================
          MAIN AREA
      ========================= */}

      <main className="main-content">

        <header className="topbar">

          <div className="search-box">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search medicines, orders..."
            />

          </div>

          <div className="topbar-right">

            {/* =========================
                NOTIFICATION BUTTON
            ========================= */}

            <div className="notification-wrapper">

              <button
                className="notification-btn"
                onClick={
                  toggleNotifications
                }
                type="button"
                aria-label="Notifications"
              >
                🔔

                {unreadNotificationCount >
                  0 && (
                  <span className="notification-count">
                    {
                      unreadNotificationCount
                    }
                  </span>
                )}
              </button>

              {/* NOTIFICATION PANEL */}

              {showNotifications && (
                <div className="notification-panel">

                  <div className="notification-header">

                    <div>
                      <h3>
                        Notifications
                      </h3>

                      <p>
                        {unreadNotificationCount >
                        0
                          ? `${unreadNotificationCount} unread notification${
                              unreadNotificationCount >
                              1
                                ? "s"
                                : ""
                            }`
                          : "All notifications read"}
                      </p>
                    </div>

                    {unreadNotificationCount >
                      0 && (
                      <button
                        type="button"
                        className="mark-read-btn"
                        onClick={
                          markAllNotificationsRead
                        }
                      >
                        Mark all read
                      </button>
                    )}

                  </div>

                  <div className="notification-list">

                    {notifications.length ===
                    0 ? (
                      <div className="no-notifications">

                        <div>
                          🔕
                        </div>

                        <strong>
                          No notifications
                        </strong>

                        <p>
                          You are all caught up.
                        </p>

                      </div>
                    ) : (
                      notifications.map(
                        (
                          notification
                        ) => (
                          <div
                            key={
                              notification.id
                            }
                            className={
                              notification.unread
                                ? "notification-item unread"
                                : "notification-item"
                            }
                          >

                            <div className="notification-icon">
                              {
                                notification.icon
                              }
                            </div>

                            <div className="notification-content">

                              <strong>
                                {
                                  notification.title
                                }
                              </strong>

                              <p>
                                {
                                  notification.message
                                }
                              </p>

                              <small>
                                {
                                  notification.time
                                }
                              </small>

                            </div>

                            {notification.unread && (
                              <span className="unread-dot"></span>
                            )}

                          </div>
                        )
                      )
                    )}

                  </div>

                  <div className="notification-footer">
                    PharmaCare Notifications
                  </div>

                </div>
              )}

            </div>

            {/* PROFILE */}

            <div className="profile-box">

              <div className="profile-avatar">
                P
              </div>

              <div>
                <strong>
                  Pharmacy Admin
                </strong>

                <small>
                  Administrator
                </small>
              </div>

            </div>

          </div>

        </header>

        <section className="page-container">

          {renderPage()}

        </section>

      </main>

      {/* =========================
          MODAL
      ========================= */}

      {modalType && (
        <FormModal
          title={getModalTitle()}
          fields={getFields()}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleFormSubmit}
          onClose={closeModal}
        />
      )}

    </div>
  );
}

export default Dashboard;