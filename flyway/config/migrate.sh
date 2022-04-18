#!/bin/bash
flyway -schemas=development migrate
flyway -schemas=test migrate