﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

namespace DB
{
    public partial class UserList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsAdmin { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool? IsDeleted { get; set; }
    }
}