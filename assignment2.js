/**********************************
 *          ALL DATA              *
 *  write your CustomerDB Object  *
 *      BELOW this Object         *
 **********************************/

var allData = [
    {type:"store", data:{store_id: 297, name: "Scotiabank - Main Branch", address_id: 1023}},
    {type:"store", data:{store_id: 614, name: "Scotiabank - Hamilton", address_id: 1984}},
    {type:"store", data:{store_id: 193, name: "Scotiabank - Mississauga", address_id: 1757}},
    {type:"customer", data:{customer_id: 26, store_id:297, first_name: "Dave", last_name: "Bennett", email: "dbennett@gmail.com", address_id: 4536, add_date: null}},
    {type:"customer", data:{customer_id: 59, store_id:193, first_name: "John", last_name: "Stevens", email: "jstevens22@hotmail.com", address_id: 2473, add_date: null}},
    {type:"customer", data:{customer_id: 29, store_id:614, first_name: "Sarah", last_name: "Pym", email: "spym99@hotmail.com", address_id: 1611, add_date: null}},
    {type:"customer", data:{customer_id: 63, store_id:297, first_name: "Steven", last_name: "Edwards", email: "steven2231@hotmail.com", address_id: 1836, add_date: null}},
    {type:"customer", data:{customer_id: 71, store_id:614, first_name: "Martin", last_name: "Scott", email: "mdog33@gmail.com", address_id: 2727, add_date: null}},
    {type:"customer", data:{customer_id: 24, store_id:614, first_name: "Jonathan", last_name: "Pym", email: "jjpym@yahoo.ca", address_id: 1611, add_date: null}},
    {type:"customer", data:{customer_id: 36, store_id:193, first_name: "Kaitlyn", last_name: "Adams", email: "katy38@hotmail.com", address_id: 5464, add_date: null}},
    {type:"customer", data:{customer_id: 73, store_id:297, first_name: "Melissa", last_name: "Bennett", email: "mbennett@gmail.com", address_id: 4536, add_date: null}},         
    {type:"address", data:{address_id: 1023, address: "2895 Yonge St.", city:"Toronto", province:"ON", postal_code:"L4C02G"}},
    {type:"address", data:{address_id: 1984, address: "3611 Main St. West", city:"Hamilton", province:"ON", postal_code:"R5O8H5"}},
    {type:"address", data:{address_id: 1757, address: "1177 Ontario St. Unit 8", city:"Mississauga", province:"ON", postal_code:"L9H6B3"}},
    {type:"address", data:{address_id: 4536, address: "3945 John St.", city: "Ajax", province: "ON", postal_code: "L7M4T9"}},
    {type:"address", data:{address_id: 2473, address: "391 Baker St. Apt 231", city: "Mississauga", province: "ON", postal_code: "M4T8S3"}},
    {type:"address", data:{address_id: 1611, address: "183 City Ct.", city: "Hamilton", province: "ON", postal_code: "J3T9V2"}},
    {type:"address", data:{address_id: 1836, address: "67 Rhymer Ave.", city: "Stouffville", province: "ON", postal_code: "L3C8H4"}},
    {type:"address", data:{address_id: 2727, address: "287 Brant St. Apt 4A", city: "Waterdown", province: "ON", postal_code: "R93G3P"}},
    {type:"address", data:{address_id: 5464, address: "11 New St. Apt 2B", city: "Brampton", province: "ON", postal_code: "L694R7"}},
];




 /*  Write your CustomerDB Object Here.  Do not forget to uncomment the "TEST DATA" section
     when you're ready.  Your code is required to run against these tests before you submit */


var CustomerDB = {
    customers: [],
    addresses: [],
    stores: [],
    insertData: function(allData) {
        allData.forEach(data => {
            if (data.type === 'customer') {
                data.type.add_date = Date.now();
                this.addCustomer(data);
            } else if (data.type === 'store')
                this.addStore(data);
            else if (data.type === 'address') 
                this.addAddress(data);
        });
    },
    addCustomer: function(customerObj) {
        customerObj.add_date = Date.now();
        this.customers.push(customerObj);
    },
    outputCustomerById: function(customer_id) {
        let customer = this.customers.filter(customer => customer.data.customer_id == customer_id);
        let customerAddress = this.addresses.filter(address => {
            if (address.data.address_id == customer.data.address_id)
                return address;
        });

        console.log(`Customer ${customer.data.customer_id}: ${customer.data.first_name} ${customer.data.last_name} (${customer.data.email})`);
        console.log(`Home address: ${customerAddress.data.city}, ${customer.data.province}. ${customer.data.postal_code}`);
    },
    outputAllCustomers: function() {
        this.customers.forEach(customer => {
            // console.log(`Customer ${customer.data.customer_id}: ${customer.data.first_name} ${customer.data.last_name} (${customer.data.email})`);
            
            // let address = this.getAddressById(customer.data.address_id);
            // console.log(`Home Add`)
            this.outputCustomerById(customer.data.customer_id);

        });
    },
    outputCustomersByStore: function(store_id) {
        let customersWithStore_Id = this.customers.filter(customer => customer.data.store_id == store_id);
        let store = this.getStoreById(store_id);

        console.log(`Customers in Store: ${store.name}`);

        customersWithStore_Id.forEach(customer => {
            console.log(`Customer ${customer.data.customer_id}: ${customer.data.first_name} ${customer.data.last_name} (${customer.data.email})`);

            let address = this.getAddressById(customer.data.address_id);
            console.log(`Home address: ${address[0].data.city}, ${address[0].data.province}. ${address[0].data.postal_code}`);
            console.log(`Joined: ${customer.data.add_date}\n`);
        })
    },
    removeCustomerById: function(customer_id) {
        let customerWithId = this.customers.filter(customer => customer.data.customer_id == customer_id);
        // Remove customer with index of customer_id
    },
    addAddress: function(address) {
        this.addresses.push(address);
    },
    getAddressById: function(address_id) {
        let addressWithId = this.addresses.filter(address => {
            if (address_id === address.data.address_id)
                return address.data;
        });

        return addressWithId;
    },
    outputAllAddresses: function() {
        console.log(`All Addresses - ${this.addresses.length}`);
        this.addresses.forEach(function(address) {
            console.log(`Address ${address.data.address_id}: ${address.data.city}, ${address.data.province}. ${address.data.postal_code}`)
        });
    },
    removeAddressById: function(address_id) {
        let addressWithId = this.addresses.filter(address => address.data.address_id == address_id);
        // Remove the addressWithId
    },
    addStore: function(storeObj) {
        this.stores.push(storeObj);
    },
    getStoreById: function(store_id) {
        let store = this.stores.filter(store => store.data.store_id == store_id);
        console.log(store);
    },
    outputAllStores: function() {
        console.log(`All Stores`);
        
        this.stores.forEach(store => {
            let storeAddressDetails = this.getAddressById(store.data.address_id);
            console.log(`Store ${store.data.store_id}: ${store.data.name}`);
            console.log(`Location: ${storeAddressDetails[0].data.address} ${storeAddressDetails[0].data.city}, ${storeAddressDetails[0].data.province}. ${storeAddressDetails[0].data.postal_code}`);
        });
    }
};

/**********************************
 *          TEST DATA             *
 *  write your CustomerDB Object  *
 *      ABOVE this code           *
 *                                *
 *  Uncomment this block of code  *
 *  when you're ready to test     *
 *  your CustomerDB Object        *
 *                                *
 *  You MUST Hand in your code    *
 *  with the test data            *
 *  uncommented, as this will     *
 *  help check your code for      *
 *  correctness                   *
 **********************************/

/* */

// Insert all Data into the Database

CustomerDB.insertData(allData);

// output all customers

console.log("CustomerDB.outputAllCustomers();\n\n--------------------------\n\n");
CustomerDB.outputAllCustomers();
console.log("--------------------------\n\n");

// output all addresses

console.log("CustomerDB.outputAllAddresses();\n\n--------------------------\n\n");
CustomerDB.outputAllAddresses();
console.log("--------------------------\n\n"); 

// output all stores

console.log("CustomerDB.outputAllStores();\n\n--------------------------\n\n");
CustomerDB.outputAllStores();
console.log("--------------------------\n\n"); 

// // output all customers in the "Main Branch"

console.log("CustomerDB.outputCustomersByStore(297);\n\n--------------------------\n\n");
CustomerDB.outputCustomersByStore(297);
console.log("--------------------------\n\n"); 

// // remove Customer Dave Bennett (customer_id 26) and Martin Scott (customer_id 71)

// console.log("CustomerDB.removeCustomerById(26);\nCustomerDB.removeCustomerById(71);\n\n");
// CustomerDB.removeCustomerById(26);
// CustomerDB.removeCustomerById(71);
// console.log("--------------------------\n\n"); 

// // output all customers again
// // NOTE: Dave Bennett and Martin Scott should be missing

// console.log("CustomerDB.outputAllCustomers();\n\n--------------------------\n\n");
// CustomerDB.outputAllCustomers();
// console.log("--------------------------\n\n");

// // output all addresses again
// // NOTE: only addrss 287 Brant St. Apt 4A Waterdown, ON. R93G3P should be missing

// console.log("CustomerDB.outputAllAddresses();\n\n--------------------------\n\n");
// CustomerDB.outputAllAddresses();
// console.log("--------------------------\n\n"); 

// // */